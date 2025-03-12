# LuaJS
Lua言語をJavaScriptに変換するAltJSです。
## 動かし方
1. zipファイルを展開
2. cdコマンドで、Luajsフォルダに移動
3. コードを順に実行
## コード
``
npm install
``

``
npx pegjs -o parser.js grammar.pegjs
``

``
node main.js (実行したいLuaファイル名)
``

``
node src.js
``
## その他
[ここから](https://www.mycompiler.io/ja/new/lua)、Lua言語のコード自体が正しいかを確認できます。
