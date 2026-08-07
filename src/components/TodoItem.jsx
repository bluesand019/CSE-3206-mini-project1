export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? "todo-text completed" : "todo-text"}>
        {todo.text}
      </span>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.text}`}
      >
        ✕
      </button>
    </div>
  );
}