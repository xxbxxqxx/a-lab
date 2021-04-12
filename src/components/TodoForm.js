import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export default function TodoForm() {
  const [profile, setProfile] = useState({
    todo1: "",
    todo2: ""
  })
  const { addTodo } = useContext(TodosContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setProfile({
      ...profile,
      [e.target.name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(profile);
    setProfile('');
  }
  return (
    <form className="form my-6" onSubmit={e => handleSubmit(e)}>
      <div>
        <label htmlFor="todo" style={{marginRight: "20px"}}>
          Todo
        </label>
        <input
          type="text"
          name="todo1"
          id="todo1"
          value={profile.todo1}
          onChange={handleChange}
          placeholder="ex. Learn about authentication"
          style={{marginRight: "20px"}}
        />
        <input
          type="text"
          name="todo2"
          id="todo2"
          value={profile.todo2}
          onChange={handleChange}
          placeholder="ex. Learn about authentication"
          style={{marginRight: "20px"}}
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        >
          Submit
        </button>
      </div>
    </form>
  );
}