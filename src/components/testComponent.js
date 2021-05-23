import React, { useContext, useEffect, useState } from 'react';

export default function testComponent({ }) {

  //Send Email
  const handleSubmit = async (e) => { 
    e.preventDefault()
    console.log('Sending...')
    //const formData = new FormData()
    //formData.append("key1", "value1");
    //formData.append("myText", e.target.myText.value);
    const filename = "scr_01.png"
    const res = await fetch(`/api/s3GetUrl?file=${filename}`);
    const data = await res.json();
    //console.log("ここから", data, "ここまで")

    const jsonBody = {
      myText: e.target.myText.value,
      myFile: e.target.myFile.value,
      s3File: data.msg
    }
    fetch('/api/sendMail', {
      method: 'POST',
      headers: {
      //  'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      //body: formData
      body: JSON.stringify(jsonBody)
    }).then(
      console.log('done, ya!')
    )
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name="myText" />
        <input type="file" name="myFile" />
        <button type="submit">put</button>
      </form>
    </div>
  )
}
