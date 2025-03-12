動作確認のために必要な手順（発表資料の最終ページのURLにて、Luaのコードが正しいかも確認できます）

zipファイルを展開

cdコマンドで、Luajsというフォルダに移動

npm install

npx pegjs -o parser.js grammar.pegjs

node main.js (実行したいLuaファイル名)

node src.js