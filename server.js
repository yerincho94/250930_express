const express = require("express"); //npm install express을 불러와서 쓴다는 의미 (의존성 -> 설치해서 사용)
const path = require("path");
const app = express(); //만들어진 객체
const port = 3000;

const dotenv = require("dotenv"); //불러들이기
dotenv.config(); //.dotenv안에 있는 데이터의 키가 인식이 된다.
//process.env.GEMINI_API_KEY

//get 요청 -> fetch, get/post
app.get("/", (req, res) => {
  //localhost:3000/ -> 브라우저를 통한 접속
  //res.send("Hello World!");
  //res.send("Bye Earth!");
  res.sendFile(path.join(__dirname, "index.html"));
});

//ai -> 대신 외부에 fetch를 통해서 전달하려고 하는거임
app.post("/gemini", async (req, res) => {
  //localhost:3000/gemini POST -> 응답을 주는 형태
  // 1. fetch
  const model = "gemini-2.5-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const apiKey = process.env.GEMINI_API_KEY;
  const headers = {
    "x-goog-api-key": apiKey,
    "Content-Type": "application/json",
  };
  const payload = {
    // 
    contents: [{ parts: [{ text: "오늘 저녁 메뉴 추천" }] }],
  };
  const response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(payload),
  });

  // 2. 라이브러리 (sdk)
  //   return res.json({ result: "ok" });
  return res.json(await response.json());
});

//listen을 통해서 서버 구동 -> 구동 시킨 서버가 localhost:3000경로와 연결됨.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
