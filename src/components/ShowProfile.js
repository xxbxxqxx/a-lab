import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { useUser } from '@auth0/nextjs-auth0';

export default function showProfile({ RecordId }) {
  const { user, error, isLoading } = useUser();

  const [profile, setProfile] = useState({
    email: "",
    description: ""
  })
  const { addTodo, updateTodo } = useContext(TodosContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setProfile({
      ...profile,
      [e.target.name]: value
    });
  }
  
  //const handleSubmit = (e) => {
  //  e.preventDefault();
  //  addTodo(profile);
  //  //updateTodo(profile);
  //  setProfile('');
  //}

  const handleToggleUpdate = (e) => {
      e.preventDefault();
      const updatedTodo = { id: RecordId, fields: profile };
      updateTodo(updatedTodo);
      //setProfile('');
  };

  return (
    <form className="form my-6 myp-form" onSubmit={e => handleSubmit(e)}>
      <div>
        <p>
          （確認用）useState の profile （ここの値が更新される）: 
          {JSON.stringify(profile)}
        </p>
        <hr />
        <div className="labelblock">
          <span>Airtable Record ID</span>
          {RecordId}
        </div>
        <div className="labelblock">
          <span>Auth0 User ID</span>
          {user && user.sub}
        </div>
        <label htmlFor="email" className="labelblock">
          <span>email</span>
          <input
            type="text"
            name="email"
            id="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="ex. test@example.com"
          />
        </label>
        <label htmlFor="email" className="labelblock">
          <span>description</span>
          <input
            type="text"
            name="description"
            id="description"
            value={profile.description}
            onChange={handleChange}
            placeholder="ex. Learn about authentication"
          />
        </label>
        <button
          type="button"
          className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          onClick={handleToggleUpdate}
        >
          ユーザー情報更新
        </button>
      </div>
    </form>
  );
}