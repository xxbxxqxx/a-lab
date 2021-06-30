import React from 'react';

const GetEmailComponent = () => {

  //const p = JSON.stringify(profile)

  return {
    "aaa": "bbb",
    "userRegistrationAdmin" : {
      "subject": "ユーザー登録がありました！",
      "body": '<h2>新規ユーザーが登録を行いました。</h2><br /><p>-</p><br /><p>詳しくは<a href="https://airtable.com/tblZIi0lMTduQcmwh/viw16uoDx9Iuy9vfd">Airtableから確認</a>してください。</p>',
    },
    "cvRegistrationAdmin" : {
      "subject": "履歴書が登録されました！",
      "body": '<h2>履歴書が登録されました。</h2><br /><br /><p>詳しくは<a href="https://airtable.com/tblZIi0lMTduQcmwh/viw16uoDx9Iuy9vfd">Airtableから確認</a>してください。</p>',
    },
    "resumeRegistrationAdmin" : {
      "subject": "職務経歴書が登録されました！",
      "body": '<h2>職務経歴書が登録されました。</h2><br /><br /><p>詳しくは<a href="https://airtable.com/tblZIi0lMTduQcmwh/viw16uoDx9Iuy9vfd">Airtableから確認</a>してください。</p>',
    }
  }
}
export default GetEmailComponent;