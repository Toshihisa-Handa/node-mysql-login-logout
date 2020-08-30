var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

router.get('/:board_id', function(req, res, next) {
  var boardId = req.params.board_id;
  var getBoardQuery = 'SELECT * FROM boards WHERE board_id = ' + boardId;//boardIdでクリックした部分だけを取得
  var getMessagesQuery = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM messages WHERE board_id = ' + boardId;
  connection.query(getBoardQuery, (err, board) =>{
      connection.query(getMessagesQuery,(err, messages)=>{
        res.render('board', {
            title: board[0].title,//titleを渡す
            board: board[0],//全ての結果を渡す
            messageList:messages
          });
      })
  });
});

router.post('/:board_id',(req,res,next)=>{
    var boardId = req.params.board_id;
    var message = req.body.message;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = 'INSERT INTO messages (board_id, message, created_at) VALUES (?,?,?)';
    connection.query(query,[boardId, message, createdAt],(err, rows)=>{
        res.redirect('/boards/'+boardId);
    });
});


module.exports = router;