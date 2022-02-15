const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();

//一つのエンドポイントでデータのやりとりをするためにミドルウェアを作成
//第一引数にパス
//第二引数にミドルウェアのハンドラー関数
app.use("/graphql", graphqlHTTP({}));

app.listen(4000, () => {
  console.log("listening port 4000");
});
