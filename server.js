const express = require("express"); //npm install express을 불러와서 쓴다는 의미 (의존성 -> 설치해서 사용)
const app = express(); //만들어진 객체
const port = 3000;

//get 요청 -> fetch, get/post
app.get("/", (req, res) => {
  //localhost:3000/ -> 브라우저를 통한 접속
  //res.send("Hello World!");
  res.send("Bye Earth!");
});

//listen을 통해서 서버 구동 -> 구동 시킨 서버가 localhost:3000경로와 연결됨.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
