var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

function encode(value){
  var encoded = '';
  while(value){
    var remainder = value % base;
    value = Math.floor(value / base);
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
