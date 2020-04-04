import React from 'react';
import classNames from 'classnames'
import './Badge.scss';

const Badge = ({ color, addClassName, onClick }) => (
  <div
    onClick={onClick}
    className={classNames('todo__sidebar__todo-list__task-menu__icon-circle', {[`color-${color}`]: color}, addClassName)}
  />
)

export default Badge