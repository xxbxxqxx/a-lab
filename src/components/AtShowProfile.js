import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { useUser } from '@auth0/nextjs-auth0';
import Moment from 'react-moment';

export default function showProfile({ atRecord, flashMessage, setFlashMessage, flashType, setFlashType }) {
  const { user, error, isLoading } = useUser();

  const prf = atRecord[0];

  const [profile, setProfile] = useState({
    uid: prf ? prf.fields.uid ? prf.fields.uid : "" : "",
    email: prf ? prf.fields.email ? prf.fields.email : "" : "",
    description: prf ? prf.fields.description ? prf.fields.description : "" : "",
    FirstName: prf ? prf.fields.FirstName ? prf.fields.FirstName : "" : "",
    LastName: prf ? prf.fields.LastName ? prf.fields.LastName : "" : "",
    CV: prf ? prf.fields.CV ? prf.fields.CV : "" : "",
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
      id: (atRecord[0].id),
      fields: profile,
    }
    console.log(updatedRecord);
    e.preventDefault();
    updateUserOnAirtable(updatedRecord);
  //  setProfile('');
    console.log('I missed ya!')
    setFlashType("welldone")
    setFlashMessage(true)
  }

  //const handleToggleUpdate = (e) => {
  //    e.preventDefault();
  //    const updatedTodo = { id: atRecord, fields: profile };
  //    updateTodo(updatedTodo);
  //    //setProfile('');
  //};

  //S3用現在時刻取得
  const dateNow = Date.now();
  const moment = require("moment");

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    //const filename = encodeURIComponent(file.name);
    const filename =
      moment().format("YYYYMMDD-HH:mm:ss")
      + "-CV-"
      + prf.fields.LastName
      + prf.fields.FirstName
      + "-" + prf.fields.uid;
    const res = await fetch(`/api/s3Upload?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      //mode: "no-cors",
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      const updatedRecord = {
        id: (prf.id),
        fields: {
          CV: "https://presignedtest-rk.s3-ap-northeast-1.amazonaws.com/" + filename
        }
      }
      updateUserOnAirtable(updatedRecord);
      console.log('Uploaded successfully!');
    } else {
      console.error(url);
    }
  };

  return (
    <div className="myp-block-wrapper">
      <h3>プロフィール更新</h3>
      <div className="myp-block-wrapper block-indevelopment">
        <h4>履歴書アップロード</h4>
        {profile.CV.length === 0
          ? <p>まだ履歴書が投稿されていません</p>
          : <p>profile.CV</p>
        }
        <input
          onChange={uploadPhoto}
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
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