## 概要
SocialNetworkingServiceを題材とした勉強用リポジトリです。  
どなたかの参考になれば幸いですが、このリポジトリの目的は自分用の備忘録です。  

このリポジトリには現在、サーバーサイドの実装のみがアップロードされています。  

> 使用言語・フレームワーク・OSSライブラリー情報  

|名前|バージョン|概要|URL|
|----|----|----|----|
|Node|v16.2.0|実行環境|https://nodejs.org/ja/|
|Express|package.json参照|WebAPIフレームワーク|https://expressjs.com/ja/|
|TypeScript|package.json参照|記述言語|https://www.typescriptlang.org/|
|express-session|package.json参照|認証機能用|https://www.npmjs.com/package/express-session|
|redis|4.0.9|セッション情報の格納先|https://redis.io/|
|ioredis|package.json参照|Nodeで使用するRedisクライアント|https://www.npmjs.com/package/ioredis|
|MySQL|5.7.35|登録情報等の保存先|https://www.mysql.com/jp/|
|mysql2|package.json参照|Nodeで使用するMySQLクライアント|https://www.npmjs.com/package/mysql2|
|bcrypt|package.json参照|パスワードの暗号化|https://www.npmjs.com/package/bcrypt|
|uuid|package.json参照|ユーザーIDの作成用|https://www.npmjs.com/package/uuid|

> npmコマンド
~~~
// package.jsonに記載されている情報に基づいてインストール
$ npm install
// tscコマンドを使用してTSファイルをトランスパイルする
$ npm run build
// Nodeでsnsを実行する
$ npm run start
~~~
npm runはpackage.jsonのscriptsに定義した動作を実行するコマンドです。  
xxxxをscriptsに定義した動作にして実行します。  
e.g. npm run watch, npm run build, npm run start  
scriptsは自由に定義することが可能です。
~~~
filepath:package.json

{
  "name": "sns",
  "version": "1.0.0",
  "private": true,
  ↓↓↓↓↓↓↓↓ この個所のこと ↓↓↓↓↓↓↓↓
  "scripts": {
    "watch": "./node_modules/.bin/nodemon ./bin/www",
    "build": "./node_modules/.bin/tsc",
    "start": "./node_modules/.bin/tsc && node ./bin/www"
  },
  ↑↑↑↑↑↑↑↑ この個所のこと ↑↑↑↑↑↑↑↑
  "dependencies": {
            ︙
  },
  "devDependencies": {
            ︙
  }
}

~~~
---
## セッション情報
expressでセッション情報を扱うためにexpress-sessionを使用しました。

> セッションIDが生成されるタイミング

app.use(session(options));した後からreq.session.idまたはreq.sessionIDでセッションIDを取得することができます。  
SessionOptionsのstoreに定義した保存先には、通常はHTTP通信の最後にsession.save()が自動的に呼び出され保存されます。
~~~
filepath:src/app.ts

app.use((req, res, next) => {
    console.log('before: ' + req.sessionID); ← before: undefined
    next();
});

app.use(session(options)); ← express-session

app.use((req, res, next) => {
    console.log('after: ' + req.sessionID); ← after: Gqntn9818jXgGGQDNAQr7WJn9uTZdFlW(この値は毎回変化します。)
    next();
});
~~~
> セッション情報の保存に関わるsaveUninitializedオプション

saveUninitializedオプションについて検索するとよく「初期化されていないセッションをストアに強制的に保存します。」  
と記載されています。  
この動作は、saveUninitializedがtrueの時の動作です。  
saveUninitializedをfalseにしている場合は、req.sessionを初期化しないとセッション情報が保存されません。  
つまり、上記で「通常はHTTP通信の最後にsession.save()が自動的に呼び出され保存される」と書きましたが、  
saveUninitializedがfalseの場合は、req.sessionを初期化しなければ保存されません。  
saveUninitializedをtrueにしている場合はreq.sessionを変更しなくても自動的にセッション情報が保存されます。  
saveUninitializedのデフォルトはtrueですが推奨されていません。

> saveUninitializedの初期化とは

saveUninitializedの初期化とは、req.sessionには任意のプロパティを定義することです。  
req.sessionに変更を加えるための作業は下記の通りです。

> 任意のプロパティを定義できるよにindex.d.tsを修正する
~~~
filepath:node_modules/@types/express-session/index.d.ts

    interface SessionData {
        cookie: Cookie;
        [key: string]: any; ← 追加(express-session v1.17.2では実装者が自分で記載しないといけない)
    }
~~~
> req.sessionに任意のプロパティを定義する。
~~~
filepath:src/api/v1/authentication/SingIn.ts
// セッション情報にuuidを登録する
this.req.session.uuid = registration.uuid; ← req.sessionの初期化
~~~
req.sessionにuuidというプロパティ定義し、registrationのuuidを代入していています。  
index.d.tsに変更を加えないとreq.session.uuidと定義しようとしても型定義にuuidというプロパティが存在しないため  
コンパイル時にエラーが発生します。  
上記の実装ではreq.sessionにuuidというプロパティを追加していますが、プロパティは任意のものを追加できます。  
express-sessionで検索した際によく見る例にreq.session.userなどがあります。  

> 保存されるセッション情報

req.session.uuidを追加した際に保存されるセッション情報を例として示します。
~~~
{
    "cookie": {
        "originalMaxAge": 1800000,
        "expires": "2021-09-19T16:06:42.792Z",
        "secure": false,
        "httpOnly": true,
        "path": "/"
    },
    "uuid": {
        "value": "96645af7-7f2f-4cc2-bc2f-367d0527dfee"
    }
}
~~~




