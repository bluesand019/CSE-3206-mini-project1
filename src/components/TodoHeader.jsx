import React from 'react'

const TodoHeader = ({ total, remaining }) => {
  return (
    <div className="todo-header">
      <h1>My tasks</h1>
      <p>
        {total === 0
          ? "No tasks yet"
          : `${total - remaining} of ${total} remaining`}
      </p>
    </div>
  )
}

export default TodoHeader