import React from 'react';
import classNames from 'classnames';
import Badge from '../Badge/Badge';
import './List.scss';
import closeIcon from '../../assets/img/remove cross.svg';
import axios from 'axios'

const List = ({ items, isRemovable, onClick, addClassName, onClickRemove, onClickItem, activeItem }) => {
  const removeList = item => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onClickRemove(item.id)
      })
    }
    items.filter(item => item.id !== item )
  }

  return (
    <ul onClick={onClick} className="todo__sidebar__todo-list">
      {items.map((item, index) => {
        const lengthNameTask = item.name.length
        const maxVisibleLengthNameTask = 15
        const isMaxLengthNameTask = lengthNameTask >= maxVisibleLengthNameTask 
        return (
          <li
            key={index}
            className={`todo__sidebar__todo-list__task-menu ${classNames(item.className, {'active': item.active ? item.active : activeItem && activeItem.id === item.id})} ${addClassName ? addClassName : ''}`}
            onClick={onClickItem ? () => onClickItem(item) : null}
          >
            <div className="todo__sidebar__todo-list__task-menu__icon-menu">
              {item.icon ? item.icon : <Badge color={item.color.name || item.color}/>}
            </div>
            <span className="todo__sidebar__todo-list__task-menu__title">
              {isMaxLengthNameTask ? (`${item.name.slice(0, maxVisibleLengthNameTask)}...`) : item.name}
              {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}
            </span>
            {isRemovable &&
              <img onClick={() => removeList(item)} className="todo__sidebar__todo-list__task-menu__icon-close" src={closeIcon} alt="Закрыть"/>
            }
          </li>
          )
      })}
    </ul>
  )
}

export default List