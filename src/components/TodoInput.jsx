import { useState } from "react";
import './TodoInput.css'
 
export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };
 
  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}