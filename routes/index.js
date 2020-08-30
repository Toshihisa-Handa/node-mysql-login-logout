var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expressdesu!' });
});

router.post('/', (req,res,next)=>{
  var title = req.body.title;
  console.log(title);
  //ここで指定したtitleはinputダグのname属性
  res.end();//この記述でリクエストを停止できる。
});

module.exports = router;
