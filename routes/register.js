var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection');

router.get('/', (req,res,next)=>{
    res.render('register',{
        title:'新規会員登録',
    });
});

router.post('/', function(req, res, next) {
    var userName = req.body.user_name;
    var email = req.body.email;
    var password = req.body.password;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var emailExistsQuery = 'SELECT * FROM users WHERE email = "' + email + '" LIMIT 1'; // 追加
    var registerQuery = 'INSERT INTO users (user_name, email, password, created_at) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + createdAt + '")'; // 変更
    connection.query(emailExistsQuery, function(err, email) {
      var emailExists = email.length;
      if (emailExists) {
        res.render('register', {
          title: '新規会員登録',
          emailExists: '既に登録されているメールアドレスです'
        });
      } else {
        connection.query(registerQuery, function(err, rows) {
          res.redirect('/login');
        });
      }
    });
  });
module.exports = router;