const express = require("express");
//{}が必要
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(
  "mongodb+srv://hiroki-yama:Test1234@cluster0.lt9vi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("db connected");
});

//一つのエンドポイントでデータのやりとりをするためにミドルウェアを作成
//第一引数にパス
//第二引数にミドルウェアのハンドラー関数
app.use("/graphql", graphqlHTTP({}));

app.listen(4000, () => {
  console.log("listening port 4000");
});
