import React from 'react';
import './Tasks.scss';
import editIcon from '../../assets/img/edit.svg';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import { Link } from 'react-router-dom';

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onDoneTask }) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name)
    if(newTitle) {
      onEditTitle(list.id, newTitle)
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
        name: newTitle
        })
        .catch(() => {
        alert('Не удалось обновить название списка')
        })
    }
  }

  return (
    <div className="todo__tasks-list__tasks" >
        <Link to={`/lists/${list.id}`}>
          <h2 className={list.color.name && `todo__tasks-list__tasks__title color-${list.color.name}`}>
            {list.name}
            <img onClick={() => editTitle(1, 'title')} src={editIcon} alt="Change"/>
          </h2>
        </Link>
      <div className="todo__tasks-list__tasks__tasks-items">
        {!withoutEmpty && list.tasks.length === 0 && <h2 className="todo__tasks-list__tasks__tasks-items__empty-task">Задачи отсутствуют</h2>}
        {list.tasks.map(task => (
          <Task
            key={task.id}
            {...task}
            list={list}
            onRemove={onRemoveTask}
            onEdit={onEditTask}
            onDone={onDoneTask}
          />
        ))}
        <AddTaskForm
          key={list.id}
          list={list}
          onAddTask={onAddTask}
        />
      </div>
    </div>
  )
}

export default Tasks