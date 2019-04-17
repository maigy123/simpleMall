var crypto = require('crypto');


function getAES (data) {    //加密
  let key = 'abcdefghijklmn12'  //密钥
  let iv = 'abcdefghijklmn12';
  var cipherChunks = [];
  var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  cipher.setAutoPadding(true);
  cipherChunks.push(cipher.update(data, 'utf8', 'base64'));
  cipherChunks.push(cipher.final('base64'));
  return cipherChunks.join('');
}

module.exports = getAES