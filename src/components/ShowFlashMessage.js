import React, { useState } from 'react';

export default function showFlashMessage({ flashMessage, setFlashMessage, flashType }) {

  if(flashMessage) {
    let flashBoxClassName = ""
    let flashBoxMessage = ""
    if(flashType == "welldone"){
      flashBoxClassName = "alert-success"
      flashBoxMessage = "Well done! Successfully changed.";
    } else if(flashType == "error"){
      flashBoxClassName = "alert-danger"
      flashBoxMessage = "Oh snap! Change a few things up and try submitting again.";
    } else if(flashType == "info"){
      flashBoxClassName = "alert-info"
      flashBoxMessage = "Heads up! This alert needs your attention, but it's not super important.";
    } else if(flashType == "warning"){
      flashBoxClassName = "alert-warning"
      flashBoxMessage = "Warning! Better check yourself, you're not looking too good.";
    } 

    return (
      <div className="myp-block-wrapper block-indevelopment">
        <p>フラッシュメッセージフラグ: {flashMessage ? "true" : "false"}</p>
        <hr />

        <div className={`alert fade alert-simple alert-dismissible text-left font__family-montserrat font__size-16 brk-library-rendered rendered show ${flashBoxClassName}`}>
          <button type="button" onClick={()=>{setFlashMessage(false)}} className="close" data-dismiss="alert"><span>Close</span></button>
          {flashBoxMessage}
        </div>

      </div>
    )
  } else{
    return ""
  }
}
