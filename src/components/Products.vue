<template>
  <div class="container">
     <!-- Header de la Pagina -->
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <div style="display: inline-block;">
            <h1 class="title">
              Our Products
            </h1>
            <h2 class="subtitle">
              New Collection
            </h2>
          </div>
          <div class="is-pulled-right" style="display: inline-block;">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="" v-model="search">
                <span class="icon is-small is-left">
                  <i class="mdi mdi-magnify"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Cards con Prdocutos -->
    <div class="columns is-multiline">
      <div class="column is-4" v-for="p in computedProductList" :key="p.id">
        <!-- Item -->
        <div class="card has-equal-height">
          <div class="image-card">
            <!-- Imagen del producto -->
            <div class="image has-spacing image is-16by16">
              <img alt="product logo" :src="p.data.picture">
            </div>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title">{{ p.data.name }}</h3>
              <p class="subtitle">$ {{ p.data.price * p.qty }}</p>
              <!-- Descripcion del producto -->
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.</p>
              <!-- Agrega y Quitar unidades del producto -->
              <div class="counter">
                <button @click="decrQty(p.id)" :disabled="p.qty === 1"><i class="mdi mdi-minus"></i></button>
                {{ p.qty }}
                <button @click="incrQty(p.id)"><i class="mdi mdi-plus"></i></button>
              </div>
               <!-- Boton para agregar al Carrito -->
              <button @click="addToCart(p)" class="button is-pulled-right is-warning">
                <i class="mdi mdi-cart"></i>
              </button>
              <div class="is-clearfix"></div>
            </div>
          </div>
        </div>
      </div> 
      <!-- End Item  -->
    </div>
    <!--  -->
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  components: {},
  props: {},
  data() {
    return {
      search: '',
    }
  },
  methods: {
    // Metodo de Incremento
    incrQty(id) {
      let idx = this.products.map(p => p.id).indexOf(id)
      this.products[idx].qty++
    },
    // Metodo de Disminucion
    decrQty(id) {
      let idx = this.products.map(p => p.id).indexOf(id)
      // console.log('decr on ', this.products[idx])
      if(this.products[idx].qty > 1) {
        this.products[idx].qty--
      }
    },
    // Agregar producto al carrito
    addToCart(product) {
      // push a copy of product to the cart
      let p = JSON.parse(JSON.stringify(product))
      this.$store.dispatch('addToCart', p)
      // Reset qty
      product.qty = 1
    }
  },
  computed: {
    ...mapState(['products']),
    computedProductList() {
      console.log(this.products)
      return this.products.filter(p => {
        return p.data.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  //
  watch: {},
  //
  created() {
    this.$store.dispatch('getProducts')
  },
  //
  mounted() {}
}
</script>

<style lang="scss" scoped>
.counter {
  display: inline-block;
  button {
    text-align: center;
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
}
</style>