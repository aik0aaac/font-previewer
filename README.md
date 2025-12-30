PC内部に保持されてるフォントを任意文字列でプレビューしてくれるアプリです。
Vue3で作成しています。

# 注意
当アプリはChromiumが提供する「Local Font Access API」を使用しています。
https://developer.chrome.com/docs/capabilities/web-apis/local-fonts?hl=ja

このため、Chromiumブラウザ「Chrome」「Edge」のみでしか動きません。
また、初回起動時はポップアップで「パソコンのフォントを使用して高品質のコンテンツを作成できます」と記載されたダイアログが出てきます。
こちらに「許可する」を選んで頂ければ使えるようになります。

# セットアップ
事前準備: 以下が必要です。
- Node.js実行環境(v25.2.1で動作確認済み)
- npm(v7.20.3で動作確認済み)

1. 当リポジトリをClone
2. 当ディレクトリで以下を実行:
   1. `npm install`
   2. `npm run dev`
3. http://localhost:5173 へアクセス
