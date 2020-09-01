var express = require('express');
var router = express.Router();
var moment = require('moment');

//mysqlConnection.jsはひとつ上の階層なのでrequire('../mysqlConnection');のようにしてパスを通してあげましょう。また.jsの部分は省略できます。
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  //var query = 'SELECT * FROM boards'; // ←このやり方だと「2020年08月30日 13時52分45秒」こうではなく「2020-08-30T04:53:50.000Z」こう表示される。
  var query = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM boards';
  connection.query(query, function(err, rows) {
    console.log(rows);
    res.render('index', { 
      title: 'はじめてのnode.js',
      boardList: rows
     });
  });
});

router.post('/', (req,res,next)=>{
  var title = req.body.title;
  var userId = req.session.user_id? req.session.user_id: 0;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO boards (user_id,title, created_at) VALUES (?,?,?)';//素でMySQLを書くのと違い、文字列を+を使って結合します。
  connection.query(query,[userId, title, createdAt],(err,rows)=>{
    res.redirect('/');
  });
});

module.exports = router;
