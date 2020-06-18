<template>
  <div id="app">
    <navbar :brand="'Mi Tienda'"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>


<style lang="scss">

</style>
