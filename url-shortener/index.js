const express = require('express');
const app = express();

app.listen(8080,function(){
  console.log("Listening to 8080");
});

app.use(express.static(__dirname));

app.get('/',function(req,res){
  res.sendFile(index.html);
});