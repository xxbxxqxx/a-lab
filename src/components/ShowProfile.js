import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { useUser } from '@auth0/nextjs-auth0';

export default function showProfile( atRecord ) {
  const { user, error, isLoading } = useUser();

  const [profile, setProfile] = useState({
    uid: atRecord["atRecord"][0] ? atRecord["atRecord"][0].fields.uid : "",
    email: atRecord["atRecord"][0] ? atRecord["atRecord"][0].fields.email : "",
    description: atRecord["atRecord"][0] ? atRecord["atRecord"][0].fields.description : "",
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
      const updatedTodo = { id: atRecord, fields: profile };
      updateTodo(updatedTodo);
      //setProfile('');
  };

  return (
    <form className="form my-6 myp-form" onSubmit={e => handleSubmit(e)}>
      <div>
        <div className="form-group">
          <label for="uid">Auth0 User ID</label>
          <input
            type="text"
            class="form-control"
            id="uid"
            aria-describedby="disabledTextInput"
            placeholder={profile.uid}
            disabled
          />
        </div>
        <div className="form-group">
          <label for="email">email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="ex. test@example.com"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label for="description">description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={profile.description}
            onChange={handleChange}
            placeholder="ex. Learn about authentication"
            className="form-control"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-md"
          onClick={handleToggleUpdate}
        >
          ユーザー情報更新
        </button>
        <hr />
        <div className="myp-block-wrapper block-indevelopment">
          <span className="label">開発用</span>
          <h3>引数 atRecord の中身</h3>
          {JSON.stringify(atRecord)}
        </div>
        <div className="myp-block-wrapper block-indevelopment">
          <span className="label">開発用</span>
          <h3>useState の profile （ここの値が更新される）: </h3>
          {JSON.stringify(profile)}
        </div>
      </div>
    </form>
  );
}