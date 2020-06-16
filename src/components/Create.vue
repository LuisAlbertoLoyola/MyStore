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
            </div>
            <div class="is-clearfix"></div>
        </form>
      </div>
     </div>
     <div class="column is-one-third"></div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
    data(){
        return{
            name: '',
            picture: '',
            price: '',
        }
    },
    methods: {
        createProduct(){
            let newProduct = {
                name: this.name,
                picture: this.picture,
                price: this.price,
            }
            axios.post('https://us-central1-tgdd3-f199f.cloudfunctions.net/products/product', newProduct, 
            {headers: {'Content-type':'application/json'}})
            .then((response) =>{
               console.log(response);
               this.$router.push(`/home`)
             })
            .catch((error) => {
               console.log(error);
            });
          }
        },
    }
</script>

<style lang="scss" scoped>
.login-container {
  padding: 2rem 1rem 0.5rem 1rem;
}
</style>