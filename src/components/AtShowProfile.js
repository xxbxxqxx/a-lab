import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { useUser } from '@auth0/nextjs-auth0';
import Moment from 'react-moment';
import { useRouter } from 'next/router';

export default function showProfile({
  atRecord,
  flashMessage,
  setFlashMessage,
  flashType,
  setFlashType,
  profile,
  setProfile,
  auth0Profile
}) {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const { createUserOnAirtable, updateUserOnAirtable } = useContext(TodosContext);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name
    //console.log(e.target.name);
    //console.log(value);
    if(value === "Yes" && profile.HearingImpairment === "Yes"){
      setProfile({ ...profile, "HearingImpairment" : "No" });
    }else if(name === "障害種別(身体障害)"){
      if(profile[name].includes(value)){//すでにレコードに存在するなら
        setProfile({ ...profile, "障害種別(身体障害)" : profile[name].filter(item => item !== value) });
      }else{
        setProfile({ ...profile, "障害種別(身体障害)" : [...profile[name], value] });
      }
    }else if(name === "障害種別(精神障害)"){
      if(profile[name].includes(value)){//すでにレコードに存在するなら
        setProfile({ ...profile, "障害種別(精神障害)" : profile[name].filter(item => item !== value) });
      }else{
        setProfile({ ...profile, "障害種別(精神障害)" : [...profile[name], value] });
      }
    }else if(name === "障害種別(発達障害)"){
      if(profile[name].includes(value)){//すでにレコードに存在するなら
        setProfile({ ...profile, "障害種別(発達障害)" : profile[name].filter(item => item !== value) });
      }else{
        setProfile({ ...profile, "障害種別(発達障害)" : [...profile[name], value] });
      }
    }else{
      setProfile({ ...profile, [name]: value });
    }
  }
  
  //プロフィール作成処理
  const handleSubmitCreate = (e) => {
    profile.uid = auth0Profile.sub
    e.preventDefault();
    createUserOnAirtable(
      profile
    ).then(
      router.push('/').then(
        console.log("Profile Registr Success!")
      )  
    )
    const jsonBody = {
      emailBody: "ユーザー登録がありました。",
    }
    //fetch('/api/sendMail', {
    //  method: 'POST',
    //  headers: {
    //  //  'Accept': 'application/json, text/plain, */*',
    //    'Content-Type': 'application/json'
    //  },
    //  body: JSON.stringify(jsonBody)
    //}).then(
    //  console.log('Email sent, ya!')
    //)
    setFlashType("welldone")
    setFlashMessage(true)
    //setInitialReister(false)
  }

  //プロフィールアップデート処理
  const handleSubmitUpdate = (e) => {
    const updatedRecord = {
      id: (atRecord[0].id),
      fields: profile,
    }
    //console.log(updatedRecord);
    e.preventDefault();
    updateUserOnAirtable(updatedRecord)
    setFlashType("welldone")
    setFlashMessage(true)
  }

  //S3用現在時刻取得
  const dateNow = Date.now();
  const moment = require("moment");

  //S3 履歴書 アップロード
  const uploadCV = async (e) => {
    e.preventDefault()
   //const file = e.target.files[0];
    const file = e.target.myimage.files[0];
    //const filename = encodeURIComponent(file.name);
    const LastNameString = atRecord[0].fields.LastName ? atRecord[0].fields.LastName : "NoLastName"
    const FirstNameString = atRecord[0].fields.FirstName ? atRecord[0].fields.FirstName : "NoFirstName"
    const UidString = profile.uid ? profile.uid : auth0Profile ? auth0Profile.sub : "NoId"
    const filename = "cv/" + moment().format("YYYYMMDD-HH:mm:ss") + "-CV-" + LastNameString + FirstNameString + "-" + UidString + "-" + file.name;
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
      //管理者向けメー送信関連処理
      const res = await fetch(`/api/s3GetUrl?file=${filename}`);
      const data = await res.json();
      const jsonBody = {
        emailBody: "履歴書がアップロードされました。",
        attachmentFile: data.msg
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

      //Airtableに格納処理
      const updatedRecord = {
        id: (atRecord[0].id),
        fields: {
          CV: "https://opengate-presigned-cv.s3.ap-northeast-1.amazonaws.com/" + filename
        }
      }
      updateUserOnAirtable(updatedRecord);
      setFlashType("welldone")
      setFlashMessage(true)
      console.log('Uploaded successfully!');
    } else {
      console.error(url);
    }
  };

  //S3 職務経歴書 アップロード
  const uploadResume = async (e) => {
    e.preventDefault()
   //const file = e.target.files[0];
    const file = e.target.myimage.files[0];
    //const filename = encodeURIComponent(file.name);
    const LastNameString = atRecord[0].fields.LastName ? atRecord[0].fields.LastName : "NoLastName"
    const FirstNameString = atRecord[0].fields.FirstName ? atRecord[0].fields.FirstName : "NoFirstName"
    const UidString = profile.uid ? profile.uid : auth0Profile ? auth0Profile.sub : "NoId"
    const filename = "resume/" + moment().format("YYYYMMDD-HH:mm:ss") + "-CV-" + LastNameString + FirstNameString + "-" + UidString + "-" + file.name;
    const res = await fetch(`/api/s3Upload?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      const res = await fetch(`/api/s3GetUrl?file=${filename}`);
      const data = await res.json();
      const jsonBody = {
        emailBody: "職務経歴書書がアップロードされました。",
        attachmentFile: data.msg
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

      const updatedRecord = {
        id: (atRecord[0].id),
        fields: {
          Resume: "https://opengate-presigned-cv.s3.ap-northeast-1.amazonaws.com/" + filename
        }
      }
      updateUserOnAirtable(updatedRecord);
      setFlashType("welldone")
      setFlashMessage(true)
      console.log('Uploaded successfully!');
    } else {
      console.error(url);
    }
  };

  const prefectureList = ["北海道","青森","岩手","宮城","秋田","山形","福島","茨城","栃木","群馬","埼玉","千葉","東京","神奈川","新潟","富山","石川","福井","山梨","長野","岐阜","静岡","愛知","三重","滋賀","京都","大阪","兵庫","奈良","和歌山","鳥取","島根","岡山","広島","山口","徳島","香川","愛媛","高知","福岡","佐賀","長崎","熊本","大分","宮崎","鹿児島","沖縄"]
  const shogaiListShintai = ["目","耳","口","右上肢","左上肢","腕下","ひじ下","手首下","手指","腰/お尻","右下肢","左下肢","太もも下","ひざ下","足首下","足指","上半身","下半身","右半身","左半身","全身","内部疾患"]
  const shogaiListSeishin = ["うつ病","双極性障害(そううつ病）","統合失調症","アルコール依存症","解離性障害","強迫性障害","睡眠障害","摂食障害","適応障害","パーソナリティ障害","不安障害","薬物依存症","PTSD(心的外傷後ストレス障害)","てんかん","高次脳機能障害","気分障害"]
  const shogaiListHattasu = ["AD(注意欠陥)","HD(多動性障害)","アスペルガー症候群","LD(学習障害)","高機能自閉症","自閉症"]
  
  const Checkbox = ({value, type}) => {
    //const [checked, setChecked] = useState(false);
    return (
      <>
      <input type="checkbox" name={type} id={type+value} value={value} checked={profile[type].includes(value)} onChange={handleChange} className="form-control" key={value} /><label htmlFor={type+value} key={"label-"+value}>{value}</label>
      </>
    )
}

  return (
    <div className="row">
      <div className="col-sm-9">
        <div className="myp-block-wrapper">
          <h3>{profile.uid ? "プロフィール更新" : "プロフィール登録"}</h3>
          <form className="form my-6 myp-form"
            onSubmit={profile.uid ? (e => handleSubmitUpdate(e)) : (e => handleSubmitCreate(e))}
          >
            <div>
              {
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
            }
              <div>
                お名前
                <div className="row">
                  <div className="col-sm">
                    <div className="form-group">
                      <label htmlFor="email">性<span style={{color: "red"}}>*</span></label>
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
                  </div>
                  <div className="col-sm">
                    <div className="form-group">
                      <label htmlFor="email">名<span style={{color: "red"}}>*</span></label>
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <div className="form-group">
                      <label htmlFor="email">性（フリガナ）<span style={{color: "red"}}>*</span></label>
                      <input
                        type="text"
                        name="LastNameKana"
                        id="LastNameKana"
                        value={profile.LastNameKana}
                        onChange={handleChange}
                        placeholder="ex. タナカ"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-group">
                      <label htmlFor="email">名（フリガナ）<span style={{color: "red"}}>*</span></label>
                      <input
                        type="text"
                        name="FirstNameKana"
                        id="FirstNameKana"
                        value={profile.FirstNameKana}
                        onChange={handleChange}
                        placeholder="ex. タロウ"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="birthday">お誕生日<span style={{color: "red"}}>*</span></label>
                    <input
                      type="date"
                      name="Birthday"
                      id="Birthday"
                      onChange={handleChange}
                      value={profile.Birthday}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div>
                住所
                <div className="row">
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">都道府県<span style={{color: "red"}}>*</span></label>
                      <select
                        name="Prefecture"
                        id="Prefecture"
                        onChange={handleChange}
                        className="form-control"
                        defaultValue={profile.Prefecture} 
                      >
                        {prefectureList.map((p) => {
                          return <option value={p} key={p}>{p}</option>
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="form-group">
                      <label htmlFor="">住所（都道府県以外）</label>
                      <input
                        type="text"
                        name="Address"
                        id="Address"
                        value={profile.Address}
                        onChange={handleChange}
                        placeholder="ex. 東京都千代田区..."
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="">電話番号<span style={{color: "red"}}>*</span></label>
                    <input
                      type="tel"
                      name="TelNo"
                      id="TelNo"
                      value={profile.TelNo}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <p>HearingImpairment: {profile.HearingImpairment}</p>
                  <div className="form-group">
                    <input
                        type="checkbox"
                        id="HearingImpairment"
                        name="HearingImpairment"
                        className="form-control"
                        //defaultChecked="checked"
                        value="Yes"
                        checked={profile.HearingImpairment === "Yes"}
                        onChange={handleChange}
                        style={{display: "inline-block", width: "auto"}}
                    />
                    <label htmlFor="HearingImpairment">聴覚障害をお持ちですか</label>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="email">メールアドレス<span style={{color: "red"}}>*</span></label>
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
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="">手帳種類<span style={{color: "red"}}>*</span></label>
                    <select
                      name="手帳種類"
                      id="TechoCategory"
                      onChange={handleChange}
                      defaultValue={profile["手帳種類"]} 
                      className="form-control"
                    >
                      <option value="">選択してください</option>
                      <option value="身体障害">身体障害</option>
                      <option value="精神（発達）障害">精神（発達）障害</option>
                      <option value="知的（発達）障害">知的（発達）障害</option>
                      <option value="申請中（身体・精神・知的）">申請中（身体・精神・知的）</option>
                      <option value="申請前">申請前</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="">障害等級</label>
                    <select
                      name="障害等級"
                      id="ShogaiTokyu"
                      onChange={handleChange}
                      defaultValue={profile["障害等級"]}
                      className="form-control"
                    >
                      {profile["手帳種類"] === "身体障害" || profile["手帳種類"] === "精神（発達）障害" || profile["手帳種類"] === "知的（発達）障害"
                        ? (
                            profile["手帳種類"] === "身体障害"
                            ? (
                                <>
                                <option value="7級">7級</option>
                                <option value="6級">6級</option>
                                <option value="5級">5級</option>
                                <option value="4級">4級</option>
                                <option value="3級">3級</option>
                                <option value="2級">2級</option>
                                <option value="1級">1級</option>
                                </>
                              )
                            : (
                                <>
                                <option value="3級">3級</option>
                                <option value="2級">2級</option>
                                <option value="1級">1級</option>
                                </>
                              )
                           )
                        : <option value="-">-</option>
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group form-group-shogaisabetsu">
                {shogaiListShintai.map(value => (
                  <Checkbox key={value} value={value} type="障害種別(身体障害)"/>
                ))}
                <hr />
                {shogaiListSeishin.map(value2 => (
                  <Checkbox key={value2} value={value2} type="障害種別(精神障害)"/>
                ))}
                <hr />
                {shogaiListHattasu.map(value3 => (
                  <Checkbox key={value3} value={value3} type="障害種別(発達障害)"/>
                ))}
              </div>

              <div className="form-group">
                <label htmlFor="Description">あなたが必要とする配慮について記載ください。</label>
                <input
                  type="text"
                  name="Description"
                  id="Description"
                  value={profile.Description}
                  onChange={handleChange}
                  placeholder=""
                  className="form-control"
                />
              </div>

              <div className="form-group form-group-oshigotostatus">
                <p>現在のステータス<span style={{color: "red"}}>*</span></p>
                <input type="radio" name="現在のステータス" id="JobStatusActive" value="仕事を探しています" onChange={handleChange} className="form-control" checked={profile["現在のステータス"] === "仕事を探しています"} /><label htmlFor="JobStatusActive">仕事を探しています</label>
                <input type="radio" name="現在のステータス" id="JobStatusInactive" value="今は仕事を探していません" onChange={handleChange} className="form-control" checked={profile["現在のステータス"] === "今は仕事を探していません"} /><label htmlFor="JobStatusInactive">今は仕事を探していません</label>
              </div>

              <button type="submit" className="btn btn-primary-register btn-lg">
                {profile.uid ? "更新" : "登録"}
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
        </div>
      </div>

      <div className="col-sm-3">
        <div className="myp-block-wrapper">
        <div className="row">
          <div className="col-sm col-cvs-tem3hda">
            <h4>履歴書</h4>
            {profile.CV.length === 0
              ? <p>履歴書が投稿されていません</p>
              : <p>投稿済みです</p>
            }
            <form 
              onSubmit={uploadCV}
            >
            <input
              type="file"
              name="myimage"
              accept="image/png, image/jpeg"
            />
            <button type="submit" className="btn btn-primary-register btn-md">送信</button>
            </form>
          </div>

          <div className="col-sm col-cvs-tem3hda">
            <h4>職務経歴書</h4>
            {profile.CV.length === 0
              ? <p>職務経歴書が投稿されていません</p>
              : <p>投稿済みです</p>
            }
            <form 
              onSubmit={uploadResume}
            >
            <input
              type="file"
              name="myimage"
              accept="image/png, image/jpeg"
            />
            <button type="submit" className="btn btn-primary-register btn-md">送信</button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}