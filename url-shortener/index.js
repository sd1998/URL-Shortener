const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Url = require('./url.js');
var convert = require('./convert.js');

const mongoUrl = "mongodb://localhost/url_shortener";
mongoose.connect(mongoUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.listen(8080,function(){
  console.log("Listening to 8080");
});

app.get('/',function(req,res){
  res.sendFile(index.html);
});

app.post('/api/shorten',function(req,res){
  var longUrl = req.body.url;
  var shortUrl = '';
  Url.findOne({long_url: longUrl},function(err,doc){
    if(doc){
      shortUrl = "http://localhost:8080/" + convert.encode(doc._id);
      res.send({'shortUrl' : shortUrl});
    }
    else{
      var saveData = Url({
        long_url: longUrl,
      })
      saveData.save(function(err){
        if(err){
          console.log(err);
        }
        shortUrl = "http://localhost:8080/" + convert.encode(saveData._id);
        res.send({'shortUrl': shortUrl});
      });
    }
  });
});

app.get('/:encoded',function(req,res){
  var encoded = req.params.encoded;
  var id = convert.decode(encoded);
  model.findOne({_id: id},function(err,doc){
    if(err){
      console.log(err);
    }
    if(doc){
      res.redirect(doc.long_url);
    }
    else{
      res.redirect("http://localhost:8080/");
    }
  });
});
