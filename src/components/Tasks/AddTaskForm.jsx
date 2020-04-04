import React, { useState } from 'react';
import './Tasks.scss';
import addSvg from '../../assets/img/add.svg';
import axios from 'axios'
import { Button } from '../index';

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false)
  const [inputValueForm, setInputValueForm] = useState('')
  const [isSending, setIsSending] = useState(false)

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm)
    setInputValueForm('')
  }

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValueForm,
      isDone: false
    }
    setIsSending(true)
    axios
      .post('http://localhost:3001/tasks', obj)
      .then(({data}) => {
        onAddTask(list.id, data )
        toggleFormVisible()
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи!')
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <div className="todo__tasks-list__tasks__tasks-items__tasks-form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="form-new">
          <img src={addSvg} alt="Add icon"/>
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="block-form">
          <input
            className="input-field"
            type="text"
            placeholder="Текст задачи"
            value={inputValueForm}
            onChange={event => setInputValueForm(event.target.value)}
          />
          <div className="block-form__btn">
            <Button
              disabled={isSending}
              nameButton={isSending ? 'Добавление': 'Добавить задачу'}
              addClassName="add-btn add-btn-task"
              onClick={addTask}
            />
            <Button
              nameButton="Отменить"
              addClassName="add-btn cancel-btn"
              onClick={toggleFormVisible}
            />
          </div>
        </div>
      )}
    </div>
    )
}

export default AddTaskForm