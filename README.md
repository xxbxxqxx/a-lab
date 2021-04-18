## アプリインスール
ローカルにリポジトリ落として、環境変数ファイル `.env.local`（別途共有）をルートにおいて、
その後、

```
npm install 
npm run dev
```
で動くと思います。
（Nodeのバージョン関係でエラーが出たら、 v15.3.0 にしていだけるといいかと。）

## Git運用方針
可能であれば適宜ブランチを切っていただけると嬉しいです（例えば "dev-style-edit-20210418" みたいなブランチ名で）。

## ファイル構成
- `src/pages/index.js` TOPページ
- `src/components/styles/style.scss` 全ページに適用されるSCSSファイル

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

**Write inline styles with {{}}**
```
<div style="margin-top: 10px, font-size: 20px">
↓
<div style={{margin-top: "10px", fontSize: "20px"}}>
```

**Internal `a` tag can be written with `<Link>`**
```
<a href="/page">
=
<Link to="/page">
```

