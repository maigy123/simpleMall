import CryptoJS from 'crypto-js'


export function getCartNumber (axios, store) {
  var userId = sessionStorage.getItem('userId')
  if (userId !== '') {
    var params = {userId: userId}
    axios.post("/carts/cartNum", params).then((res) => {
      if (res.data.code === 0) {
        store.commit('alterCart', res.data.data)
      }
    })
  } else {
    store.commit('alterCart', 0)
  }
}

export function getAES (data) {    //加密
  var key = 'abcdefghijklmn12'  //密钥
  var iv = 'abcdefghijklmn12'
  var encrypted = getAesString(data, key, iv) //密文
  // var encrypted1 =CryptoJS.enc.Utf8.parse(encrypted)
  return encrypted
}

function getDAesString(encrypted, _key, _iv) {       // 解密函数调用
  var key = CryptoJS.enc.Utf8.parse(_key)
  var iv = CryptoJS.enc.Utf8.parse(_iv)
  var decrypted =CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

function getAesString (data, _key, _iv) {     // 加密时函数调用
  var key = CryptoJS.enc.Utf8.parse(_key)
  var iv = CryptoJS.enc.Utf8.parse(_iv)
  var encrypted =CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()  //返回的是base64格式的密文
}

export function getDAes (encrypted) {      //解密
  var key = 'abcdefghijklmn12'
  var iv = 'abcdefghijklmn12'
  var decryptedStr = getDAesString(encrypted, key, iv)
  return decryptedStr
}

export default {
  getCartNumber,
  getAES,
  getDAes
}