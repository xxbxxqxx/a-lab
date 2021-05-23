import React, { useState, useContext, useEffect } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { useUser } from '@auth0/nextjs-auth0';

export default function createProfile({
  flashMessage,
  setFlashMessage,
  flashType,
  setFlashType,
  profile,
  setProfile, 
  initialReister,
  setInitialReister
}) {

  //const [userProfile, setUserProfile] = useState({
  //  email: "",
  //  description: "",
  //  cv: "",
  //})

  const handleChange = (e) => {
    const value = e.target.value;
    //setUserProfile({
    setProfile({
      //...userProfile,
      ...profile,
      [e.target.name]: value
    });
  }

  const { createUserOnAirtable } = useContext(TodosContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserOnAirtable(
      profile
    ).then(
      console.log("Profile Registr Success!")
    )
    //setProfile({
    //  uid]: value
    //});
    const jsonBody = {
      emailBody: "ユーザー登録がありました。",
    }
    fetch('/api/sendMail', {
      method: 'POST',
      headers: {
      //  'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonBody)
    }).then(
      console.log('Email sent, ya!')
    )
    setFlashType("welldone")
    setFlashMessage(true)
    setInitialReister(false)
    //updateTodo(profile);
    //setProfile('');
  }

  return (
    <div className="myp-block-wrapper">
      <h3>プロフィール登録</h3>
      <form onSubmit={e => handleSubmit(e)}>
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