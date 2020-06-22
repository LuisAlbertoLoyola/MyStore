<template>
  <div id="app">
    <navbar :brand="'Mi Tienda'"/>
    <!-- Modal Carga -->
  <div class="modal" :class="{'is-active': load}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <progress class="progress is-danger" max="100">60%</progress>
      </div>
    </div>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapState(['load'])
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
