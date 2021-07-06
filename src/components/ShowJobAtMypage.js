import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
//import GetEmailComponent from "../components/GetEmailContent";
//import { useUser } from '@auth0/nextjs-auth0';
//import Moment from 'react-moment';
//import { useRouter } from 'next/router';

import { fetchEntriesMypage } from '../lib/contentfulPosts'

export default function ShowJobAtMypage({ auth0Profile, contentfulposts, initialProfile, 
  flashMessage,
  setFlashMessage,
  flashType,
  setFlashType}) {

  const { updateUserOnAirtable } = useContext(TodosContext);

  const [interestedPosts, setInterestedPosts] = useState(
    initialProfile[0] && initialProfile[0].fields["興味のある求人"] ? initialProfile[0].fields["興味のある求人"] : []
  )

  let userEmail = ""
  if(initialProfile[0] && initialProfile[0].fields.email){
    userEmail = initialProfile[0].fields.email
  }else{
    userEmail = auth0Profile.email
  }

  let ctflFlug = false
  contentfulposts.map((po) => {
    if(po.target && po.target.includes(userEmail)){
      ctflFlug = true
    }
  })
  //let jobStatus = false
  //if(initialProfile[0].fields["現在のステータス"] && initialProfile[0].fields["現在のステータス"] === "仕事を探しています"){
  //  jobStatus = true
  //}

  const handleSubmitApply = async (e) => {
    e.preventDefault()
    const emailBodyContent = "お名前: " + initialProfile[0].fields.LastName + " " + initialProfile[0].fields.FirstName + "<br />"
      + "メールアドレス: " + initialProfile[0].fields.email + "<br />"
      + "求人ID: " + e.target.jobId.value + "<br />"
      + "求人タイトル: " + e.target.jobTitle.value + "<br />"
    const jsonBody = {
      emailSubject: "求人情報へのお申し込みがありました",
      emailBody: emailBodyContent
    }
    fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonBody)
    }).then(
      console.log('Email sent, ya!')
    )

    const new_value = e.target.jobId.value
    setInterestedPosts([...interestedPosts, new_value])
    interestedPosts.push(new_value)

    //Airtableに格納処理
    let updatedRecord = {
      id: (initialProfile[0].id),
      fields: {
        "興味のある求人": interestedPosts
      }
    }
    updateUserOnAirtable(updatedRecord);
    setFlashType("welldone")
    setFlashMessage(true)
  };

  return (
    <>
    {ctflFlug 
    ? <div className="row">
      <div className="col-sm-12">
        <div className="myp-block-wrapper myp">
          <h3>おすすめ求人</h3>
          <div className="row job-col">
            {contentfulposts.map((p) => {
              let ctflnode = ""
              p.target && p.target.includes(userEmail)
                ? ctflnode = (
                    <div className="col-sm-6 job-col-in" key={p.title}>
                      <div className="job-col-in-cont-in">
                        <h3><img src="/image/job-col-icon2.png" /></h3>
                        <div className="ttl-cap">
                          <p>{p.jobId} | {p.title}</p>
                        </div>
                        <div className="job-info">
                        {p.description.split(/\n/g).map(value => (
                          <>{value}<br /></>
                        ))}
                        </div>

                        <form className="form myp-form" onSubmit={e => handleSubmitApply(e)} >
                          <input type="hidden" value={p.jobId} name="jobId" />
                          <input type="hidden" value={p.title} name="jobTitle" />
                          <button type="submit" className="btn btn-primary-register btn-lg">
                            {interestedPosts.includes(p.jobId.toString(10)) ? "応募済み" : "話を聞きたい"}
                          </button>
                        </form>
                      </div>
                    </div>
                  )
                : ctflnode = ""
              return ctflnode
            })}
          </div>
        </div>
      </div>
    </div>
    : ""
    }
    </>
  );
}