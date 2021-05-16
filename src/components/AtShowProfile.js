import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { useUser } from '@auth0/nextjs-auth0';

export default function showProfile( atRecord ) {
  const { user, error, isLoading } = useUser();

  const [profile, setProfile] = useState({
    uid: atRecord.atRecord[0] ? atRecord.atRecord[0].fields.uid : "",
    email: atRecord.atRecord[0] ? atRecord.atRecord[0].fields.email : "",
    description: atRecord.atRecord[0] ? atRecord.atRecord[0].fields.description : "",
    FirstName: atRecord.atRecord[0] ? atRecord.atRecord[0].fields.FirstName : "",
    LastName: atRecord.atRecord[0] ? atRecord.atRecord[0].fields.LastName : "",
  })
  const { updateUserOnAirtable } = useContext(TodosContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setProfile({
      ...profile,
      [e.target.name]: value
    });
  }
  
  const handleSubmit = (e) => {
    const updatedRecord = {
      id: (atRecord.atRecord[0].id),
      fields: profile,
    }
    console.log(updatedRecord);
    e.preventDefault();
    updateUserOnAirtable(updatedRecord);
  //  setProfile('');
  }

  //const handleToggleUpdate = (e) => {
  //    e.preventDefault();
  //    const updatedTodo = { id: atRecord, fields: profile };
  //    updateTodo(updatedTodo);
  //    //setProfile('');
  //};

  return (
    <div className="myp-block-wrapper">
    <h3>プロフィール更新</h3>
    <form className="form my-6 myp-form" onSubmit={e => handleSubmit(e)}>
      <div>
        <div className="form-group">
          <label htmlFor="uid">Auth0 User ID</label>
          <input
            type="text"
            className="form-control"
            id="uid"
            aria-describedby="disabledTextInput"
            placeholder={profile.uid}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Last Name</label>
          <input
            type="text"
            name="LastName"
            id="LastName"
            value={profile.LastName}
            onChange={handleChange}
            placeholder="ex. 田中"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">First Name</label>
          <input
            type="text"
            name="FirstName"
            id="FirstName"
            value={profile.FirstName}
            onChange={handleChange}
            placeholder="ex. 太郎"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
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
          <label htmlFor="description">description</label>
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
          type="submit"
          className="btn btn-primary btn-md"
          //onClick={handleToggleUpdate}
        >
          ユーザー情報更新
        </button>
        <hr />
        <div className="myp-block-wrapper block-indevelopment">
          <span className="label">開発用</span>
          <h3>引数 atRecord の中身</h3>
          {JSON.stringify(atRecord.atRecord)}
        </div>
        <div className="myp-block-wrapper block-indevelopment">
          <span className="label">開発用</span>
          <h3>useState の profile （ここの値が更新される）: </h3>
          {JSON.stringify(profile)}
        </div>
      </div>
    </form>
    </div>
  );
}