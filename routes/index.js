var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expressdesu!' });
});

router.post('/', (req,res,next)=>{
  var title = req.body.title;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(title);//ここで指定したtitleはinputダグのname属性
  console.log(createdAt);

  res.end();//この記述でリクエストを停止できる。


});

module.exports = router;
