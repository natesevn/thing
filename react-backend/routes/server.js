const express = require('express');
const router = express();

var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var dbo
var upb = 'Zm9zdGVyOjEyMzQ1Ng=='
var ups = Buffer.from(upb, 'base64').toString();
var url = 'mongodb://user:1@ds261479.mlab.com:61479/workshop';

router.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(url,(err,client) =>{
    if (err) return console.log(err)
    dbo = client.db('workshop');
    router.listen(3000, () => {
        console.log('listening on 3000')
    })
})

router.get('/', (req, res) => {
    var re = new RegExp(/^as/);
    dbo.collection('quotes').find().toArray(function(err, results) {
        res.send({express: results})
    })
})


router.post('/quotes', (req,res) =>{
    dbo.collection("quotes").insertOne(req.body, function ( err, result){
        if (err) throw err;
        console.log("1 Quote inserted")
    });
    res.redirect('/');
});

module.exports = router;



/*router.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


module.exports = router;*/