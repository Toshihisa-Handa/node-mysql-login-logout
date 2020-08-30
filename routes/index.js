var express = require('express');
var router = express.Router();
var moment = require('moment');

//mysqlConnection.jsはひとつ上の階層なのでrequire('../mysqlConnection');のようにしてパスを通してあげましょう。また.jsの部分は省略できます。
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expressdesu!' });
});

router.post('/', (req,res,next)=>{
  var title = req.body.title;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO boards (title, created_at) VALUES (?,?)';//素でMySQLを書くのと違い、文字列を+を使って結合します。
  connection.query(query,[title, createdAt],(err,rows)=>{
    res.redirect('/');
  });
});

module.exports = router;
