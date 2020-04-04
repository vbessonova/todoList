import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Badge, List, Button } from '../index'
import closeSvg from '../../assets/img/remove.svg';
import './AddList.scss';

const AddList = ({ colors, onAddNewList }) => {
  const [ visiblePopup, setVisiblePopup ] = useState(false);
  const [ selectColor, setSelectColor ] = useState(3);
  const [ inputValue, setInputValue ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectColor(colors[0].id)
    }
  }, [colors])

  const onClose = () => {
    setVisiblePopup(false)
    setInputValue('')
    setSelectColor(colors[0].id)
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите назваие списка')
      return
    }
    setIsLoading(true)

    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectColor
      })
      .then(({data}) => {
        const selectedColor = colors.filter(color => color.id === selectColor)[0].name
        const listObj = {...data, color: {name: selectedColor}, tasks: []}
        onAddNewList(listObj)
        onClose()
      })
      .catch((e, listObj, data) => {
      alert('Ошибка при добавлении списака!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="todo__sidebar__add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items= {[
          {
            className: 'add-task',
            icon: (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1V15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 8H15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
            name: 'Создать список',
            isActive: false,
          },
        ]}
      />
     {visiblePopup &&
       <div className="todo__sidebar__add-list__popup">
         <img onClick={onClose} src={closeSvg} className="todo__sidebar__add-list__popup__close-icon" alt="Закрыть"/>
         <input
           className="input-field"
           type="text"
           placeholder="Название списка"
           value={inputValue}
           onChange={event => setInputValue(event.target.value)}
         />
         <div className="popup-colors">
           {colors.map(color =>
               <Badge
                  key={color.id}
                  color={color.name}
                  addClassName={`badge-in-add-list ${selectColor === color.id && 'active'}`}
                  onClick={() => setSelectColor(color.id)}
               />
           )}
         </div>
         <Button
           nameButton="Добавить"
           onClick={addList}
           addClassName="add-btn"
         >
          {isLoading ? 'Добавление...' : 'Добавить'}
         </Button>
       </div>
     }
    </div>
  )
}

export default AddList


