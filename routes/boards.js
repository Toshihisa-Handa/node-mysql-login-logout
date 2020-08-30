var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

router.get('/:board_id', function(req, res, next) {
  var boardId = req.params.board_id;
  var query = 'SELECT * FROM boards WHERE board_id = ' + boardId;//boardIdでクリックした部分だけを取得
  connection.query(query, function(err, board) {
    res.render('board', {
      title: board[0].title,//titleを渡す
      board: board[0]//全ての結果を渡す
    });
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