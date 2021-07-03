import React, { useState, useContext } from 'react';
//import { TodosContext } from '../contexts/TodosContext';
//import GetEmailComponent from "../components/GetEmailContent";
//import { useUser } from '@auth0/nextjs-auth0';
//import Moment from 'react-moment';
//import { useRouter } from 'next/router';

import { fetchEntriesMypage } from '../lib/contentfulPosts'

export default function ShowJobAtMypage({ auth0Profile, contentfulposts, initialProfile}) {

  let userEmail = ""
  if(initialProfile[0].fields.email){
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
  let jobStatus = false
  if(initialProfile[0].fields["現在のステータス"] && initialProfile[0].fields["現在のステータス"] === "仕事を探しています"){
    jobStatus = true
  }

  return (
    <>
    {ctflFlug && jobStatus 
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
                          <p>{p.title}</p>
                        </div>
                        <div className="job-info">
                        {p.description.split(/\n/g).map(value => (
                          <>{value}<br /></>
                        ))}
                        </div>
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