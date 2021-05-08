import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { useUser } from '@auth0/nextjs-auth0';

export default function createProfile( profile ) {

  const [userProfile, setUserProfile] = useState({
    email: "",
    description: "",
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setUserProfile({
      ...userProfile,
      [e.target.name]: value
    });
  }

  const { createUserOnAirtable } = useContext(TodosContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserOnAirtable(userProfile).then(console.log("success!!"));
    //updateTodo(profile);
    //setProfile('');
  }

  return (
    <div className="myp-block-wrapper">
    <h3>プロフィール登録</h3>
    <form onSubmit={e => handleSubmit(e)}>
      {JSON.stringify(userProfile)}
      <div className="form-group">
        <label htmlFor="todo">email</label>
        <input
          type="text"
          name="email"
          id="email"
          //onChange={(e) => setUserProfile(e.target.value)}
          onChange={handleChange}
          placeholder="email@example.com"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">description</label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
          placeholder="ex. Learn about authentication"
          className="form-control"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-md"
      >
        登録
      </button>
    </form>
    </div>
  );
}