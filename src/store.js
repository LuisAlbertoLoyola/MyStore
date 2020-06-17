import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
function getCartTotal(productsList) {
  let price = 0.0
  productsList.forEach(p => {
    price += p.data.price * p.qty
  })
  return price
}
function newCart() {
  return {
    list: [],
    total: 0.0,
  }
}

export default new Vuex.Store({
  state: {
    // Productos
    products: [],
    // User
    currentUser: getFromStorage('user') || undefined,
    // Cart
    shoppingCart: getFromStorage('cart') || newCart(),
    showCart: false,
    loading: false,
    edit: false
  },

  mutations: {
    //reset mut
    LOADING_PRODUCTS(state){
      state.loading = !state.loading
    },
    GET_PRODUCTS(state, products){
      state.products = []
      products.forEach((prod) => {
        prod['qty'] = 1
        state.products.push(prod)
      })
      state.loading = false
    },
    // User
    UPDATE_CURR_USER(state, user) {
      state.currentUser = user
      setInStorage('user', user)
    },
    // Cart
    ADD_TO_CART(state, product) {
      // add def qty if not defined
      if (product.qty === undefined ) { product['qty'] = 1 }
      // increase qty if exists, else add to cart as new
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product.id)
      if (pidx >= 0) {
        state.shoppingCart.list[pidx].qty++
      } else {
        state.shoppingCart.list.push(product)
      }
      // update total price
      state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
      // update in storage
      setInStorage('cart', state.shoppingCart)
    },
    REMOVE_FROM_CART(state, product_id) {
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product_id)
      if (pidx >= 0) {
        state.shoppingCart.list.splice(pidx, 1)
        // update total price
        state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
        // update in storage
        setInStorage('cart', state.shoppingCart)
      } else {
        throw new Error("Product not found in cart")
      }
    },
    CLEAR_CART(state) {
      state.shoppingCart = newCart()
      // update in storage
      setInStorage('cart', state.shoppingCart)
    },
    UPDATE_SHOW_CART(state, value) {
      state.showCart = value
    },
  },

  actions: {
   //show Products 
    getProducts ({ commit }) {
      // se carga la mutacion
      commit('LOADING_PRODUCTS')
      //CARGA O NO CARGA INFO
      axios.get('https://us-central1-tgdd3-f199f.cloudfunctions.net/products/products',
        { headers: { "Content-type": "text/plain" }
        }).then((accept) => {
        //variable auxiliar
        let data = accept.data;
        //llamar otra mutacion
        commit('GET_PRODUCTS', data)
        })
    },
    // User
    updateUser ({commit}, user) {
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURR_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    addToCart ({commit}, product) {
      return new Promise((resolve, reject) => {
        try {
          commit('ADD_TO_CART', product)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    removeFromCart ({commit}, product_id) {
      return new Promise((resolve, reject) => {
        try {
          commit('REMOVE_FROM_CART', product_id)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    clearCart ({commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_CART')
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    updateShowCart({commit}, val) {
      console.log('setting showCart to ', val)
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATE_SHOW_CART', !!val) // !! double-negation for Boolen casting
          resolve(true)
        } catch(e) { reject(e) }
      })
    }  
  },


  getters: {
    // User
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    // Cart
    shoppingCart: state => state.shoppingCart,
    showCart: state => state.showCart,
  }
})
