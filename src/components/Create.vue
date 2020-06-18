<template>
  <div>
    <!--formulario-->
    <div class="columns">
      <div class="column is-one-third"></div>
      <div class="column is-one-third">
        <div class="login-container card">
          <form>
            <!-- Name Field -->
            <div class="field">
              <label class="label">Name</label>
              <div>
                <input type="text" placeholder="Enter the name of the product" v-model="name" class="input">
              </div>
            </div>
            <!-- Price Field -->
            <div class="field">
              <label class="label">Price</label>
              <div>
                <input type="number" placeholder="Enter the price of the product" v-model="price" class="input">
              </div>
            </div>
            <!-- Picture Field -->
            <div class="field">
              <label class="label">Picture</label>
              <div>
                <input type="text" placeholder="Enter the URL of the image" v-model="picture" class="input">
              </div>
            </div>
            <!-- Submit Field-->
            <div class="field">
              <button class="button is-primary is-pulled-right" @click="createProduct">Add Product</button>
              <button class="button is-primary is-pulled-right" v-if="edit">Edit Product</button>
            </div>
            <div class="is-clearfix"></div>
          </form>
        </div>
      </div>
      <!-- Table -->
      <div class="columns">
         <div class="column is-one-third"></div>
        <div class="column is-one-third">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Picture</th>
              <th colspan="2" class="action">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in computedProductList" :key="p.id">
              <td>{{ p.data.name }}</td>
              <td>{{ p.data.price }}</td>
              <td>{{ p.data.picture.substring(0,50) }}</td>
              <td>
                <button class="button btn-success" @click="editProduct(p.id)">Edit</button>
                <!-- @click="editItem(p['.key'])"  -->
                <div class="is-clearfix"></div>
              </td>
              <td>
                <button class="button btn-danger" @click="deleteProduct(p.id)">Delete</button>
                <!-- @click="deleteItem(p['.key'])" -->
                <div class="is-clearfix"></div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
</template>

<script>

  import axios from 'axios'
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        name: '',
        picture: '',
        price: '',
      }
    },
    methods: {
      ...mapActions(['updateEdit']),
      createProduct() {
        let newProduct = {
          name: this.name,
          picture: this.picture,
          price: this.price
        }
        console.log(newProduct)
        axios.post('https://us-central1-tgdd3-f199f.cloudfunctions.net/products/product', newProduct, {headers: {'content-type': 'application/json'}})
          .then((response) => {
            console.log(response);
            this.$router.dispatch('getProducts')
            //this.$router.push('/home`)
          }).catch(function(error) {
            console.log(error);
          });
      },
      deleteProduct(id){
        let confirmation = confirm('Are you sure you want to delete this product?')
        if (confirmation){
            axios.delete(`https://us-central1-tgdd3-f199f.cloudfunctions.net/products/product/${id}`, {headers: {'content-type': 'application/json'}})
            .then(() => {
              alert('Product successfully deleted')
              this.$store.dispatch('getProducts')
            })
          }
      },
      editProduct(id){
        this.updateEdit()
        this.findProduct(id)
      },
      findProduct(id){
        axios.get(`https://us-central1-tgdd3-f199f.cloudfunctions.net/products/product/${id}`, {headers:{'content-type':'aplication/json'}})
        .then((response)=>{
          console.log(response)
        })
      }
    },

    computed: {
      ...mapState(['products', 'edit']),
      computedProductList(){
        return this.products 
      }
    },
    mounted() {
      this.$store.dispatch('getProducts')
    },
  }
</script>

<style lang="scss" scoped>
.login-container {
  padding: 2rem 1rem 0.5rem 1rem;
}
</style>