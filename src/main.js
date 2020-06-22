import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebaseConfig from '@/firebase';
import Firebase from 'firebase';

Firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

// Main Styles
import './assets/scss/main.scss'

let app= ''
Firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      Firebase,
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})