//npmでインストールしたmysqlが使えるようになります
var mysql = require('mysql');

//db接続の定義
var dbConfig ={
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'bulletin_board'
};

//データベースの情報をオブジェクトにして引数に渡し、その返り値をconnectionという変数に代入
var connection = mysql.createConnection(dbConfig);
// これは
// //DBの接続準備
// const connection =
//    mysql.createConnection({
//       host:'localhost',
//       user:'root',//mampではroot
//       password:'',//mampでは空でOK
//       database:'node_test_db'//任意のDB名
//    });
// と同じ


//外部からrequireできる形にします
module.exports = connection;