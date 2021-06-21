import React, { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { useUser } from '@auth0/nextjs-auth0';
import Moment from 'react-moment';

export default function showProfile({
  atRecord,
  flashMessage,
  setFlashMessage,
  flashType,
  setFlashType,
  profile,
  setProfile
}) {
  const { user, error, isLoading } = useUser();
  //const prf = atRecord[0];
  //const [profile, setProfile] = useState({
  //  uid: prf ? prf.fields.uid ? prf.fields.uid : "" : "",
  //  email: prf ? prf.fields.email ? prf.fields.email : "" : "",
  //  description: prf ? prf.fields.description ? prf.fields.description : "" : "",
  //  FirstName: prf ? prf.fields.FirstName ? prf.fields.FirstName : "" : "",
  //  LastName: prf ? prf.fields.LastName ? prf.fields.LastName : "" : "",
  //  CV: prf ? prf.fields.CV ? prf.fields.CV : "" : "",
  //})
  const { updateUserOnAirtable } = useContext(TodosContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setProfile({
      ...profile,
      [e.target.name]: value
    });
  }
  
  //プロフィールアップデート処理
  const handleSubmit = (e) => {
    const updatedRecord = {
      id: (atRecord[0].id),
      fields: profile,
    }
    //console.log(updatedRecord);
    e.preventDefault();
    updateUserOnAirtable(updatedRecord);
    //  setProfile('');
    setFlashType("welldone")
    setFlashMessage(true)
  }

  //S3用現在時刻取得
  const dateNow = Date.now();
  const moment = require("moment");

  const uploadPhoto = async (e) => {
    e.preventDefault()
   //const file = e.target.files[0];
   const file = e.target.myimage.files[0];
    //const filename = encodeURIComponent(file.name);
    const filename =
      moment().format("YYYYMMDD-HH:mm:ss")
      + "-aCV-"
      + prf.fields.LastName
      + prf.fields.FirstName
      + "-" + prf.fields.uid
      + "-" + file.name;
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
        id: (prf.id),
        fields: {
          CV: "https://presignedtest-rk.s3-ap-northeast-1.amazonaws.com/" + filename
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

  return (
    <div className="myp-block-wrapper">
      <h3>プロフィール更新</h3>
      
      <div className="row">
        <div className="col-sm">
          <h4>履歴書アップロード</h4>
          {profile.CV.length === 0
            ? <p>まだ履歴書が投稿されていません</p>
            : <p>profile.CV</p>
          }
          <form 
            onSubmit={uploadPhoto}
          >
          <input
            //onChange={uploadPhoto}
            type="file"
            name="myimage"
            accept="image/png, image/jpeg"
          />
          <button type="submit">送信</button>
          </form>
        </div>
        <div className="col-sm">
          <h4>職務経歴書アップロード</h4>
          {profile.CV.length === 0
            ? <p>まだ履歴書が投稿されていません</p>
            : <p>profile.CV</p>
          }
          <form 
            onSubmit={uploadPhoto}
          >
          <input
            //onChange={uploadPhoto}
            type="file"
            name="myimage"
            accept="image/png, image/jpeg"
          />
          <button type="submit">送信</button>
          </form>
        </div>
       </div>

      <form className="form my-6 myp-form" onSubmit={e => handleSubmit(e)}>
        <div>
          {/*}
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
        */}
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
                  >
                    {prefectureList.map((p) => {
                      return (
                        profile.Prefecture === p
                        ? <option value={p} selected>{p}</option>
                        : <option value={p}>{p}</option>
                      )
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
              <div className="form-group">
                <input
                    type="checkbox"
                    id="HearingImpairment"
                    name="HearingImpairment"
                    className="form-control"
                    //defaultChecked="checked"
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
                  name="TechoCategory"
                  id="TechoCategory"
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">選択してください</option>
                  <option value="shintai-shogai">身体障害</option>
                  <option value="seishin-shogai">精神（発達）障害</option>
                  <option value="chiteki-shogai">知的（発達）障害</option>
                  <option value="shinseichu">申請中（身体・精神・知的）</option>
                  <option value="shinseimae">申請前</option>
                </select>
              </div>
            </div>
            <div className="col-sm">
              <div className="form-group">
                <label htmlFor="">障害等級</label>
                {profile.TechoCategory === "shintai-shogai"
                  && (
                    <select
                      name=""
                      id=""
                      value=""
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">7級</option>
                      <option value="">6級</option>
                      <option value="">5級</option>
                      <option value="">4級</option>
                      <option value="">3級</option>
                      <option value="">2級</option>
                      <option value="">1級</option>
                    </select>
                )}
                {profile.TechoCategory === "seishin-shogai"
                  && (
                    <select
                      name=""
                      id=""
                      value=""
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">3級</option>
                      <option value="">2級</option>
                      <option value="">1級</option>
                    </select>
                )}
                {profile.TechoCategory === "seishin-shogai"
                  && (
                    <select
                      name=""
                      id=""
                      value=""
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">3級</option>
                      <option value="">2級</option>
                      <option value="">1級</option>
                    </select>
                )}
              </div>
            </div>
          </div>
          <div className="form-group form-group-shogaisabetsu">
            <p>障害種別</p>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">■身体障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">目</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">耳</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">口</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">右上肢</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">左上肢</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">腕下</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">ひじ下</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">手首下</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">手指</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">腰/お尻</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">右下肢</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">左下肢</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">太もも下</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">ひざ下</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">足首下</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">足指</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">上半身</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">下半身</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">右半身</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">左半身</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">全身</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">内部疾患</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">■精神障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">うつ病</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">双極性障害(そううつ病）</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">統合失調症</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">アルコール依存症</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">解離性障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">強迫性障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">睡眠障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">摂食障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">適応障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">パーソナリティ障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">不安障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">薬物依存症</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">PTSD(心的外傷後ストレス障害)</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">てんかん</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">高次脳機能障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">気分障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">■発達障害</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">AD(注意欠陥)</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">HD(多動性障害)</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">アスペルガー症候群</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">LD(学習障害)</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">高機能自閉症</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">自閉症</label>
            <input type="checkbox" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">■その他</label>
          </div>

          <div className="form-group">
            <label htmlFor="description">あなたが必要とする配慮について記載ください。</label>
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

          <div className="form-group form-group-oshigotostatus">
            <p>現在のステータス<span style={{color: "red"}}>*</span></p>
            <input type="radio" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">仕事を探しています</label>
            <input type="radio" name="" id="" value="" onChange={handleChange} className="form-control" /><label for="">今は仕事を探していません</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-md"
          >
            ユーザー情報更新
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
  );
}