## アプリインスール
ローカルにリポジトリ落として、環境変数ファイル `.env.local`（別途共有）をルートにおいて、
その後、

```
npm install 
npm run dev
```

その後 http://localhost:3000 にアクセスしてサイトが表示されればOK。
（Nodeのバージョン関係でエラーが出たら、 v15.3.0 にしていだけるといいかと。）

## Git運用方針
可能であれば適宜ブランチを切って作業いただけると嬉しいです（例えば "dev-style-edit-20210418" みたいなブランチ名で）。

## 主なファイル構成
- `src/pages/index.js` TOPページ
- `src/components/styles/style.scss` 全ページに適用されるSCSSファイル
- `src/components/header.js` 共通ヘッダー
- `public/images` 画像はとりあえずここに入れておいてもらえると。

## ざっくり書き方
※不明点いろいろ出てくると思うので、都度お聞きください。

**Every tag needs closing tag or closed with “/”.**
```
<div>...</div>
<img src="..." />
<br />
```

**Since class attribute is used by js, use className instead.**
```
<div class="XXXX">
↓
<div className="XXXX">
```

**Write inline styles with {{}} and can't use "-"**
```
<div style="margin-top: 10px, font-size: 20px">
↓
<div style={{marginTop: "10px", fontSize: "20px"}}>
```

**Internal `a` tag can be written with `<Link>`**
```
<a href="/page">
=
<Link href="/page">
```

