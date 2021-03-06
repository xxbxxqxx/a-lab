import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import GetEmailComponent from "../components/GetEmailContent";
import { useUser } from '@auth0/nextjs-auth0';
import Moment from 'moment-timezone/builds/moment-timezone-with-data';
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

  const moment = require("moment");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name
    //console.log(e.target.name);
    //console.log(value);
    if (value === "Yes" && profile.HearingImpairment === "Yes") {
      setProfile({ ...profile, "HearingImpairment": "No" });
    } else if (name === "障害種別(身体障害)") {
      if (profile[name].includes(value)) {//すでにレコードに存在するなら
        setProfile({ ...profile, "障害種別(身体障害)": profile[name].filter(item => item !== value) });
      } else {
        setProfile({ ...profile, "障害種別(身体障害)": [...profile[name], value] });
      }
    } else if (name === "障害種別(精神障害)") {
      if (profile[name].includes(value)) {//すでにレコードに存在するなら
        setProfile({ ...profile, "障害種別(精神障害)": profile[name].filter(item => item !== value) });
      } else {
        setProfile({ ...profile, "障害種別(精神障害)": [...profile[name], value] });
      }
    } else if (name === "障害種別(発達障害)") {
      if (profile[name].includes(value)) {//すでにレコードに存在するなら
        setProfile({ ...profile, "障害種別(発達障害)": profile[name].filter(item => item !== value) });
      } else {
        setProfile({ ...profile, "障害種別(発達障害)": [...profile[name], value] });
      }
    } else {
      setProfile({ ...profile, [name]: value });
    }
  }

  //プロフィール作成処理
  const handleSubmitCreate = async (e) => {
    profile.uid = auth0Profile.sub
    profile["登録日"] = moment().tz('Asia/Tokyo').format("YYYY/MM/DD HH:mm")
    e.preventDefault();
    createUserOnAirtable(
      profile
    ).then(
      router.push('/').then(
        console.log("Profile Registr Success!")
      )
    )
    //To ユーザー
    const emailBodyContentUsers = profile.LastName + profile.FirstName + '様<br /><br />'
      + 'この度はご登録いただき、誠にありがとうございます。<br />ご登録情報が確認でき次第、担当よりご連絡差し上げます。<br />しばらく、お待ち下さいますようお願い申し上げます。<br />'
      + '<br />'
      + 'OpenGate Careers（オープンゲートキャリアズ）事務局<br />'
      + '<br />'
      + '=============================<br />'
      + '以下の内容でご登録承りました。<br />'
      + '=============================<br />'
      + '■ お名前　' + profile.LastName + profile.FirstName + '<br />'
      + '■ 電話番号　' + profile.TelNo +'<br />'
      + '■ メールアドレス　' + profile.email + '<br />'
      + '■ 手帳種類　' + profile["手帳種類"] + '<br />'
      + '<br />'
      + '=============================<br />'
      + 'マイページを活用して、あなたの就職活動をサポートします！　　<br />'
      + '=============================<br />'
      + '◆ご自身の情報（氏名・居住エリア等）や履歴書・職務経歴書の登録ができます。<br />'
      + '◆担当者との面談後、あなたへの「おススメ求人」を見ることができます。<br />'
      + '◆履歴書添削や模擬面談の希望をマイページよりご依頼いただけます。<br />'
      + '<br />'
      + '【マイページURL】<br />'
      + '<a href="https://opengate.careers/mypage/">https://opengate.careers/mypage/</a><br />'
      + '<br />'
      + '※このメールは OpenGate Careers（オープンゲートキャリアズ）からの自動返信メールです<br />'
      + '※このメールには返信はできませんのでご注意ください<br />'
      + '※配信停止（退会）をご希望の方は、<a href="https://opengate.careers/withdraw">こちらのページ</a>から手続きを行ってください<br />'
      + '――――――――――――――――――――――――――――――――――――<br />'
      + 'OpenGate Careers（オープンゲートキャリアズ）：<a href="https://www.opengate.careers/">https://www.opengate.careers/</a><br />'
      + '問い合わせ先：OpenGate Careers事務局：contact@opengate.careers<br />'
      + '<br />'
      + 'OpenGate Careers（オープンゲートキャリアズ）<br />'

    const jsonBodyUsers = {
      emailSubject: "【本登録完了】　OpenGate Careers（オープンゲートキャリアズ）へのご登録ありがとうございます。",
      emailBody: emailBodyContentUsers,
      emailTo: profile.email
    }
    fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonBodyUsers)
    })

    //To 管理者
    const emailBodyContent = '<h2>新規ユーザーが登録を行いました。</h2><br /><p>'
      + "UID: " + profile.uid + "<br />"
      + "メールアドレス: " + profile.email + "<br />"
      + "名前: " + profile.LastName + profile.FirstName + "<br />"
      + "電話番号: " + profile.TelNo + "<br />"
      + "手帳種類: " + profile["手帳種類"] + "<br />"
      + "現在のステータス: " + profile["現在のステータス"]
      + '</p><br /><p>詳しくは<a href="https://airtable.com/tblZIi0lMTduQcmwh/viw16uoDx9Iuy9vfd">Airtableから確認</a>してください。</p>'
    const jsonBody = {
      emailSubject: GetEmailComponent(profile).userRegistrationAdmin.subject,
      emailBody: emailBodyContent
    }
    const resUserRegistration = await fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        //  'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonBody)
    })
    //console.log(jsonBody)
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

  //S3 履歴書 アップロード
  const uploadCV = async (e) => {
    e.preventDefault()
    //const file = e.target.files[0];
    const file = e.target.myimage.files[0];
    //const filename = encodeURIComponent(file.name);
    const LastNameString = atRecord[0].fields.LastName ? atRecord[0].fields.LastName : "NoLastName"
    const FirstNameString = atRecord[0].fields.FirstName ? atRecord[0].fields.FirstName : "NoFirstName"
    const UidString = profile.uid ? profile.uid : auth0Profile ? auth0Profile.sub : "NoId"
    const originFilename = file.name
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

    console.log('>>> ' + JSON.stringify(upload))

    if (upload.ok) {
      //const res = await fetch(`/api/s3GetUrl?file=${filename}`);
      //const data = await res.json();
      //const emailBodyContent = '<h2>履歴書が登録されました。</h2><br />'
      //  + "お名前: " + atRecord[0].fields.LastName + " " + atRecord[0].fields.FirstName + "<br />"
      //  + "メールアドレス: " + atRecord[0].fields.email
      //  + '<br /><p>詳しくは<a href="https://airtable.com/tblZIi0lMTduQcmwh/viw16uoDx9Iuy9vfd">Airtableから確認</a>してください。</p>'
      //const jsonBody = {
      //  emailSubject: GetEmailComponent().cvRegistrationAdmin.subject,
      //  emailBody: emailBodyContent,
      //  attachmentFile: data.msg
      //}
      //fetch('/api/sendMail', {
      //  method: 'POST',
      //  headers: {
      //    //  'Accept': 'application/json, text/plain, */*',
      //    'Content-Type': 'application/json'
      //  },
      //  body: JSON.stringify(jsonBody)
      //}).then(
      //  console.log('Email sent, ya!')
      //)

      //Airtableに格納処理
      const updatedRecord = {
        id: (atRecord[0].id),
        fields: {
          CV: "https://opengate-presigned-cv.s3.ap-northeast-1.amazonaws.com/" + filename, 
          "CVファイル名": originFilename
        }
      }
      updateUserOnAirtable(updatedRecord);
      setProfile({ ...profile, "CVファイル名": originFilename})
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
    const originFilename = file.name
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
      const updatedRecord = {
        id: (atRecord[0].id),
        fields: {
          Resume: "https://opengate-presigned-cv.s3.ap-northeast-1.amazonaws.com/" + filename,
          "Resumeファイル名": originFilename
        }
      }
      updateUserOnAirtable(updatedRecord);
      setProfile({ ...profile, "Resumeファイル名": originFilename})
      setFlashType("welldone")
      setFlashMessage(true)
      console.log('Uploaded successfully!');
    } else {
      console.error(url);
    }
  };

  const handleChangeCvOption = (e) => {
    const value = e.target.value;
    const name = e.target.name
    if (value === "Yes" && name === "添削希望" && profile["添削希望"] === "Yes") {
      setProfile({ ...profile, "添削希望": "No" });
    } else if (value === "Yes" && name === "面談希望" && profile["面談希望"] === "Yes") {
      setProfile({ ...profile, "面談希望": "No" });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  }
  const handleSubmitUpdateCvOption = (e) => {
    const updatedRecord2 = {
      id: (atRecord[0].id),
      fields: profile,
    }
    e.preventDefault();
    updateUserOnAirtable(updatedRecord2)
    setFlashType("welldone")
    setFlashMessage(true)

    const emailBodyContent = '<h2>履歴書オプションが更新されました。</h2><br />'
      + "お名前: " + atRecord[0].fields.LastName + " " + atRecord[0].fields.FirstName + "<br />"
      + "メールアドレス: " + atRecord[0].fields.email + "<br />"
      + "添削希望: " + (profile && profile["添削希望"]) + "<br />"
      + "面談希望: " + (profile && profile["面談希望"]) + "<br />"
      + '<br /><p>詳しくは<a href="https://airtable.com/tblZIi0lMTduQcmwh/viw16uoDx9Iuy9vfd">Airtableから確認</a>してください。</p>'
    const jsonBody = {
      emailSubject: "履歴書オプションが更新されました。",
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
  }

  const prefectureList = ["北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島", "茨城", "栃木", "群馬", "埼玉", "千葉", "東京", "神奈川", "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山", "鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"]
  const shogaiListShintai = ["目", "耳", "口", "右上肢", "左上肢", "腕下", "ひじ下", "手首下", "手指", "腰/お尻", "右下肢", "左下肢", "太もも下", "ひざ下", "足首下", "足指", "上半身", "下半身", "右半身", "左半身", "全身", "内部疾患"]
  const shogaiListSeishin = ["うつ病", "双極性障害(そううつ病）", "統合失調症", "アルコール依存症", "解離性障害", "強迫性障害", "睡眠障害", "摂食障害", "適応障害", "パーソナリティ障害", "不安障害", "薬物依存症", "PTSD(心的外傷後ストレス障害)", "てんかん", "高次脳機能障害", "気分障害"]
  const shogaiListHattasu = ["AD(注意欠陥)", "HD(多動性障害)", "アスペルガー症候群", "LD(学習障害)", "高機能自閉症", "自閉症"]

  const Checkbox = ({ value, type }) => {
    //const [checked, setChecked] = useState(false);
    return (
      <>
        <input type="checkbox" name={type} id={type + value} value={value} checked={profile[type].includes(value)} onChange={handleChange} className="form-control" key={value} /><label htmlFor={type + value} key={"label-" + value}>{value}</label>
      </>
    )
  }

  return (
    <div className="row">
      <div className="col-sm-9">
        <div className="myp-block-wrapper">
          <h3><i class="fa fa-user-circle-o" aria-hidden="true"></i>{profile.uid ? "プロフィール更新" : "プロフィール登録"}</h3>
          <form className="form my-6 myp-form"
            onSubmit={profile.uid ? (e => handleSubmitUpdate(e)) : (e => handleSubmitCreate(e))}
          >
            <div>
              {
                <div className="form-group">
                  <label className="mypage-cap" htmlFor="uid">Auth0 User ID</label>
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
                <p className="mypage-cap">お名前</p>
                <div className="row">
                  <div className="col-sm">
                    <div className="form-group">
                      <label htmlFor="email">性<span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        name="LastName"
                        id="LastName"
                        value={profile.LastName}
                        onChange={handleChange}
                        placeholder="ex. 田中"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-group">
                      <label htmlFor="email">名<span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        name="FirstName"
                        id="FirstName"
                        value={profile.FirstName}
                        onChange={handleChange}
                        placeholder="ex. 太郎"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <div className="form-group">
                      <label htmlFor="email">性（フリガナ）<span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        name="LastNameKana"
                        id="LastNameKana"
                        value={profile.LastNameKana}
                        onChange={handleChange}
                        placeholder="ex. タナカ"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-group">
                      <label htmlFor="email">名（フリガナ）<span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        name="FirstNameKana"
                        id="FirstNameKana"
                        value={profile.FirstNameKana}
                        onChange={handleChange}
                        placeholder="ex. タロウ"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <div className="form-group">
                    <label className="mypage-cap" htmlFor="birthday">生年月日<span style={{ color: "red" }}>*</span></label>
                    <input
                      type="date"
                      name="Birthday"
                      id="Birthday"
                      onChange={handleChange}
                      value={profile.Birthday}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="mypage-cap">住所</p>
                <div className="row">
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="">都道府県<span style={{ color: "red" }}>*</span></label>
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
                    {profile.HearingImpairment === "Yes"
                      ? <>
                        <label className="mypage-cap" htmlFor="">電話番号</label>
                        <input
                          type="tel"
                          name="TelNo"
                          id="TelNo"
                          value={profile.TelNo}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </>
                      : <>
                        <label className="mypage-cap" htmlFor="">電話番号<span style={{ color: "red" }}>*</span></label>
                        <input
                          type="tel"
                          name="TelNo"
                          id="TelNo"
                          value={profile.TelNo}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </>
                    }
                  </div>
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
                      style={{ display: "inline-block", width: "auto" }}
                    />
                    <label className="mypage-cap" htmlFor="HearingImpairment">聴覚障害をお持ちの方はこちらにチェックしてください</label>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="email">メールアドレス<span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="ex. test@example.com"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <div className="form-group">
                    <label className="mypage-cap" htmlFor="">手帳種類<span style={{ color: "red" }}>*</span></label>
                    <select
                      name="手帳種類"
                      id="TechoCategory"
                      onChange={handleChange}
                      defaultValue={profile["手帳種類"]}
                      className="form-control"
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="身体障害">身体障害</option>
                      <option value="精神（発達）障害">精神（発達）障害</option>
                      <option value="知的（発達）障害">知的（発達）障害</option>
                      <option value="申請中（身体・精神・知的）">申請中</option>
                      <option value="申請前">申請前</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label className="mypage-cap" htmlFor="">障害等級</label>
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
                              profile["手帳種類"] === "精神（発達）障害"
                                ? (
                                  <>
                                    <option value="3級">3級</option>
                                    <option value="2級">2級</option>
                                    <option value="1級">1級</option>
                                  </>
                                )
                                : (
                                  <>
                                    <option value="最重度">最重度</option>
                                    <option value="重度">重度</option>
                                    <option value="中度">中度</option>
                                    <option value="軽度">軽度</option>
                                  </>
                                )
                            )
                        )
                        : <option value="-">-</option>
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group form-group-shogaisabetsu">
                <p>ご自身の症状に合うものをチェックしてください。</p>
                <p className="mypage-cap">■身体障害</p>
                {shogaiListShintai.map(value => (
                  <Checkbox key={value} value={value} type="障害種別(身体障害)" />
                ))}
                <hr />
                <p className="mypage-cap">■精神障害</p>
                {shogaiListSeishin.map(value2 => (
                  <Checkbox key={value2} value={value2} type="障害種別(精神障害)" />
                ))}
                <hr />
                <p className="mypage-cap">■発達障害</p>
                {shogaiListHattasu.map(value3 => (
                  <Checkbox key={value3} value={value3} type="障害種別(発達障害)" />
                ))}
                <hr />
                <p className="mypage-cap">■その他</p>
                <div className="form-group">
                  <input
                    type="text"
                    name="障害種別(その他)"
                    id="ShogaiSyubetsuOther"
                    value={profile["障害種別(その他)"]}
                    onChange={handleChange}
                    placeholder=""
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="mypage-cap" htmlFor="Description">あなたが必要とする配慮について記載ください。</label>
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
                <p className="mypage-cap">現在のステータス<span style={{ color: "red" }}>*</span></p>
                <input type="radio" name="現在のステータス" id="JobStatusActive" required value="仕事を探しています" onChange={handleChange} className="form-control" checked={profile["現在のステータス"] === "仕事を探しています"} /><label htmlFor="JobStatusActive">仕事を探しています</label>
                <input type="radio" name="現在のステータス" id="JobStatusInactive" required value="今は仕事を探していません" onChange={handleChange} className="form-control" checked={profile["現在のステータス"] === "今は仕事を探していません"} /><label htmlFor="JobStatusInactive">今は仕事を探していません</label>
              </div>

              <button type="submit" className="btn btn-primary-register btn-lg">
                {profile.uid ? "更新" : "登録"}
              </button>
              {/*
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
              */}
            </div>
          </form>
        </div>
        {profile.uid &&
        <div style={{margin: "20px 0", padding: "30px 20px", background: "#eee", border: "solid 1px #ccc"}}>
          <div className="row">
            <div className="col-sm-9">退会手続きはこちら</div>
            <div className="col-sm-3" style={{textAlign: "center"}}>
              <a href="/withdraw"
                style={{background: "#fff", padding: "10px 30px",borderRadius: "0.3rem", border: "solid 2px #ccc"}}
              >
                退会申請
              </a>
            </div>
          </div>
        </div>
        }
      </div>

      <div className="col-sm-3">
        <div className="myp-block-wrapper">
          <div className="row">
            <div className="col-sm col-cvs-tem3hda">
              <h4>履歴書</h4>
              {profile.uid
                ? <>
                  {profile["CVファイル名"] && profile["CVファイル名"].length === 0
                    ? <p style={{fontSize: "14px"}}>履歴書が投稿されていません</p>
                    : <p style={{fontSize: "14px"}}>{profile["CVファイル名"]} が投稿済みです。</p>
                  }
                  <form
                    onSubmit={uploadCV}
                  >
                    <input
                      type="file"
                      name="myimage"
                      accept="*"
                    />
                    <button type="submit" className="btn btn-primary-register btn-md">登録</button>
                  </form>
                </>
                : "まずはプロフィール登録を完了してください"
              }
            </div>
            <div className="col-sm col-cvs-tem3hda">

              {profile.uid
                && <>
                  <h4>職務経歴書</h4>
                  {profile["Resumeファイル名"] && profile["Resumeファイル名"].length === 0
                    ? <p style={{fontSize: "14px"}}>職務経歴書が投稿されていません</p>
                    : <p style={{fontSize: "14px"}}>{profile["Resumeファイル名"]} 投稿済みです</p>
                  }
                  <form
                    onSubmit={uploadResume}
                  >
                    <input
                      type="file"
                      name="myimage"
                      accept="*"
                    />
                    <button type="submit" className="btn btn-primary-register btn-md">登録</button>
                  </form>
                </>
              }

            </div>
          </div>
          {profile.uid
            && <div className="col-sm col-cvs-tem3hda">
              <form className="form my-6 myp-form"
                onSubmit={e => handleSubmitUpdateCvOption(e)}
              >
                <h4>オプション</h4>
                <div className="form-group">
                  <input
                    type="checkbox"
                    id="tensaku"
                    name="添削希望"
                    className="form-control"
                    value="Yes"
                    checked={profile["添削希望"] === "Yes"}
                    onChange={handleChangeCvOption}
                    style={{ display: "inline-block", width: "auto" }}
                  />
                  <label htmlFor="tensaku">添削希望</label>
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    id="mensetsu"
                    name="面談希望"
                    className="form-control"
                    value="Yes"
                    checked={profile["面談希望"] === "Yes"}
                    onChange={handleChangeCvOption}
                    style={{ display: "inline-block", width: "auto" }}
                  />
                  <label htmlFor="mensetsu">面談希望</label>
                </div>
                <button type="submit" className="btn btn-primary-register btn-lg">
                  更新
                </button>
              </form>
            </div>
          }
        </div>
      </div>
    </div>
  );
}