var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    //    var cursor = dbo.collection('quotes').find()
      var re = new RegExp(/^as/);
      //   dbo.collection('quotes').find({name: re}).toArray(function(err, results) {
      dbo.collection('quotes').find().toArray(function(err, results) {
  //      console.log(results)
          //res.render('index.ejs', {quotes: results})
        console.log(results);
    })
})


router.post('/quotes', (req,res) =>{
//    console.log(req.body)
    dbo.collection("quotes").insertOne(req.body, function ( err, result){
        if (err) throw err;
        console.log("1 Quote inserted")
    });
    res.redirect('/');
//    res.sendFile(__dirname + '/index.html')
});

module.exports = router;
