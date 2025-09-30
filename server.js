const express = require("express"); //npm install express을 불러와서 쓴다는 의미 (의존성 -> 설치해서 사용)
const path = require("path");
const app = express(); //만들어진 객체
const port = 3000;

app.use(express.json()); //post로 전달 받은 내용중, body를 json화 시켜줌

const dotenv = require("dotenv"); //불러들이기
dotenv.config(); //.dotenv안에 있는 데이터의 키가 인식이 된다.
//process.env.GEMINI_API_KEY

const { GoogleGenAI } = require("@google/genai");

//get 요청 -> fetch, get/post
app.get("/", (req, res) => {
  //localhost:3000/ -> 브라우저를 통한 접속
  //res.send("Hello World!");
  //res.send("Bye Earth!");
  res.sendFile(path.join(__dirname, "index.html"));
});

//ai -> 대신 외부에 fetch를 통해서 전달하려고 하는거임
app.post("/gemini", async (req, res) => {
  console.log(req.body); //undefined뜨기 때문에
  // 1. 상단에 app.use(express.json())을 선언해줘야 함.
  // 2. content-type 을 json으로 (index.html에서 확인)
  const { text } = req.body; //구조분해할당

  //localhost:3000/gemini POST -> 응답을 주는 형태
  // 1. fetch
  const model = "gemini-2.5-flash-lite";
  //const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const apiKey = process.env.GEMINI_API_KEY;
  /* const headers = {
    "x-goog-api-key": apiKey,
    "Content-Type": "application/json",
  };
  const payload = {
    // contents: [{ parts: [{ text: "오늘 저녁 메뉴 추천" }] }],
    contents: [{ parts: [{ text }] }],
  };
  const response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(payload),
  }); */

  // 2. 라이브러리 (SDK)
  // -> SDK를 사용하면 위에 headers부터 response까지의 코드는 필요없다.
  // --> 이것도 따로 설치 필요 : npm install @google/genai

  const ai = new GoogleGenAI({
    apiKey,
  }); //SDK
  const result = await ai.models.generateContent({
    model, //속성명과 변수명이 같으면 한번만 입력
    contents: text, //dom을 통해서 전달받은 text.
  });
  //   return res.json({ result: "ok" });
  //   return res.json(await response.json());
  return res.json(result);
});

//listen을 통해서 서버 구동 -> 구동 시킨 서버가 localhost:3000경로와 연결됨.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
