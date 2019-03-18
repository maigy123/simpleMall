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

export default {
  getCartNumber
}