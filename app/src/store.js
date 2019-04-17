import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carts: [],
    getNewCarts: false,
    cartNum: 0,
    sellerInfo: {}
  },
  getters: {
    cartNum: (state) => {
      return state.cartNum
    } 
  },
  mutations: {
    alterCart (state, number) {
      state.cartNum = number
    },
    setSellerInfo (state, data) {
      state.sellerInfo = data
    }
  },
  actions: {}
});
