//import del vue, axios y vuex (CRUD)
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Funciones globales que son llamadas en las acciones
function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj)) //envia el producto al carrito
}

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) // mostrar items del carrito
}

function getCartTotal(productsList) { //obtener total (cuando se suma o resta en la card)
  let price = 0.0
  productsList.forEach(p => {
    price += p.data.price * p.qty
  })
  return price
}

function newCart() { // limpia el carrito
  return {
    list: [],
    total: 0.0,
  }
}

const baseUrl = 'https://us-central1-tgdd3-f199f.cloudfunctions.net/products'

export default new Vuex.Store({
  // los state son la fuente de datos de los componentes
  state: {
    // Usuario
    currentUser: getFromStorage('user') || undefined,
    // Carrito
    shoppingCart: getFromStorage('cart') || newCart(),
    showCart: false,
     // Productos
    products: [],
    loading: false,
    load: false,
    edit: false
  },
  //las mutations son funciones que modifican estados. Cumplen una funcion como los methos
  mutations: {
    //Resetear Mutaciones, renderiza los productos
    LOADING_PRODUCTS(state){
      state.loading = !state.loading
    },
    // va agregando o quitando productos
    GET_PRODUCTS(state, products){
      state.products = []
      products.forEach((prod) => {
        prod['qty'] = 1
        state.products.push(prod)
      })
      state.loading = false
    },
    // Mutación que muestra el overlay de la página
    SET_LOADING(state) { state.load = true },
    UNSET_LOADING(state) { state.load = false },
    // Usuario
    UPDATE_CURR_USER(state, user) {
      state.currentUser = user
      setInStorage('user', user)
    },
    // CARRITO
    // Agrega productos al carrito
    ADD_TO_CART(state, product) {
      // Agregar producto si hay un producto definido
      if (product.qty === undefined ) { product['qty'] = 1 }
      // Incremementar cantidad, sino agregar a carrito nuevo
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product.id)
      if (pidx >= 0) {
        state.shoppingCart.list[pidx].qty++
      } else {
        state.shoppingCart.list.push(product)
      }
      // actualizar precio total
      state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
      // actualizar en storage
      setInStorage('cart', state.shoppingCart)
    },
    // Borra elementos del carrito
    REMOVE_FROM_CART(state, product_id) {
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product_id)
      if (pidx >= 0) {
        state.shoppingCart.list.splice(pidx, 1)
        // actualizar precio total
        state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
        // actualizar en storage
        setInStorage('cart', state.shoppingCart)
      } else {
        throw new Error("Product not found in cart")
      }
    },
    // Vacia el carrito
    CLEAR_CART(state) {
      state.shoppingCart = newCart()
      // actualizar en storage
      setInStorage('cart', state.shoppingCart)
    },
    UPDATE_SHOW_CART(state, value) {
      state.showCart = value
    },
    UPDATE_EDIT(state) {
      state.edit = !state.edit
    }
  },
  // las actions son como las mutations, pero se diferencian porque se encargan de realizar operaciones asincronas
  // una promise es un objeto que representa la terminacion o la falla de una operacion asincrona
  actions: {
    // Accion para actualizar el usuario
    updateUser ({commit}, user) {
      return new Promise((resolve, reject) => {
        try{
          // llama a la mutacion
          commit('UPDATE_CURR_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    // Accion para agregar al Carrito
    addToCart ({commit}, product) {
      return new Promise((resolve, reject) => {
        try {
          commit('ADD_TO_CART', product)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Accion para borrar productos del Carrito
    removeFromCart ({commit}, product_id) {
      return new Promise((resolve, reject) => {
        try {
          commit('REMOVE_FROM_CART', product_id)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Accion para vaciar el Carrito
    clearCart ({commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_CART')
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Accion para actualizar el carrito
    updateShowCart({commit}, val) {
      console.log('setting showCart to ', val)
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATE_SHOW_CART', !!val) // !! double-negation for Boolen casting
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Accion que permite mostrar los productos y genera el overlay mientras recarga la vistas
    getProducts ({ commit }) {
      // Se carga la mutacion
      commit ('SET_LOADING')
      commit('LOADING_PRODUCTS')
      // Carga o no carga la info
      axios.get(`${baseUrl}/products`,
        { headers: { "Content-type": "text/plain" }
        }).then((accept) => {
        // variable auxiliar
        let data = accept.data;
        // llamar otra Mutacion
        commit('GET_PRODUCTS', data)
        }).finally(() => {
        commit('UNSET_LOADING')
        })
    },
    // Actualizar edicion producto
      updateEdit({commit}) {
      commit('UPDATE_EDIT')
    }
  },
  // los getters al igual que los estados son fuente de datos, pero procesados. Es decir, datos modificados para
  // entregarse en un formato deseado
  getters: {
    // Usuario
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    // Carrito
    shoppingCart: state => state.shoppingCart,
    showCart: state => state.showCart,
  }
})
