const express = require("express");
const path = require("path");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  "mongodb+srv://admin:qwer1234@cluster0.mdran.mongodb.net/?retryWrites=true&w=majority",
  function (에러, client) {
    if (에러) return console.log(에러);
    //서버띄우는 코드 여기로 옮기기

    db = client.db("todoapp");

    app.listen("8080", function () {
      console.log("listening on 8080");
    });
  }
);

// app.listen(8080, function () {
//   console.log('listening on 8080')
// });

app.use(express.json());
var cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "just-do-it/build")));

app.post('/add', function (요청, 응답) {
  db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){
    var 총게시물갯수 = 결과.totalPost

    db.collection('post').insertOne({ _id : 총게시물갯수 + 1, 제목 : 요청.body.title, 날짜 : 요청.body.date }, function (에러, 결과) {
      db.collection('counter').updateOne({name:'게시물갯수'},{ $inc: {totalPost:1} },function(에러, 결과){
	if(에러){return console.log(에러)}
        응답.send('전송완료');
      })
    })

  })
})

app.get("/list", function (요청, 응답) {
  db.collection("post")
    .find()
    .toArray(function (에러, 결과) {
      console.log(결과);
      응답.send(결과);
    });
});

app.delete("/list", function (요청, 응답) {
  console.log(요청.body._id);
  console.log("삭제요청누름");

  요청.body._id = parseInt(요청.body._id);
  // 요청.body._id = parseInt(요청.body);

  var 삭제할데이터 = { _id: 요청.body._id };
  // var 삭제할데이터 = {_id:요청.body._id, 작성자: 요청.user._id};

  db.collection("post").deleteOne(삭제할데이터, function (에러, 결과) {
    console.log("삭제완료");
    응답.status(200).send({ message: "성공했습니다." });

    if (에러) {
      console.log(에러);

    }
  });
});

app.get("*", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "just-do-it/build/index.html"));
});
