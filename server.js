const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


MongoClient.connect("mongodb+srv://admin:qwer1234@cluster0.mdran.mongodb.net/?retryWrites=true&w=majority", function(에러, client){
  if (에러) return console.log(에러);
  //서버띄우는 코드 여기로 옮기기

  db = client.db('todoapp');

  app.listen('8080', function(){
    console.log('listening on 8080')
  });
})


// app.listen(8080, function () {
//   console.log('listening on 8080')
// }); 

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname,'just-do-it/build')));

app.post('/add', function(요청,응답){
  응답.send('전송완료');
  db.collection('post').insertOne({
    제목: 요청.body.title, 날짜: 요청.body.date
  }, function(){console.log('저장완료')})
})

app.get('/list', function(요청, 응답){
  db.collection('post').find().toArray(function(에러, 결과){
    console.log(결과)
    응답.send(결과)
  });
})

app.get('*', function(요청, 응답){
  응답.sendFile(path.join(__dirname,"just-do-it/build/index.html" ))
})