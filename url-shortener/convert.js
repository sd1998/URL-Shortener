var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

function encode(id){
  for(var i = 0;i <= id.length - 1;i++){
    var ascii_value = id.charCodeAt(i);
    if((ascii_value >= 65 && ascii_value <= 90) || (ascii_value >= 97 && ascii_value <= 122)){
      var sub1 = id.substring(0,i);
      var sub2 = id.substring(i+1,id.length);
      id = sub1.concat(sub2);
      i--;
    }
  }
  var encoded = '';
  var intId = parseInt(id);
  while(intId){
    var remainder = intId % base;
    intId = Math.floor(intId / base);
    encoded = alphabet[remainder] + encoded;
  }
  return encoded;
}

function decode(encoded){
  var decoded = 0;
  while(encoded){
    var index = alphabet.indexOf(encoded[0]);
    var power = encoded.length - 1;
    decoded = decoded + index * (Math.pow(base, power));
    encoded = encoded.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;
