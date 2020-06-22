<template>
  <div>
    <!-- Sección del Formulario para Crear Producto -->
    <div class="columns">
      <div class="column is-one-third"></div>
      <div class="column is-one-third">
        <div class="form-container card">
          <form>
            <h1 class="title is-4 has-text-centered">Add New Product</h1>
            <!-- Nombre -->
            <div class="field">
              <label class="label">Name</label>
              <input type="text" placeholder="Enter the name of the product" v-model="name" class="input">
            </div>
            <!-- Precio -->
            <div class="field">
              <label class="label">Price</label>
              <input type="number" placeholder="Enter the price of the product" v-model="price" class="input">
            </div>
            <!-- Imagen -->
            <div class="field">
              <label class="label">Picture</label>
              <input type="text" placeholder="Enter the URL of the image" v-model="picture" class="input">
            </div>
            <!-- Submit -->
            <div class="buttons">
              <button class="button is-primary is-pulled-right" @click="createProduct">Add Product</button>
              <button class="button is-danger is-pulled-right" v-if="edit" @click="updateProduct(id)">Edit Product</button>
            </div>
            <div class="is-clearfix"></div>
          </form>
        </div>
      </div>
      <div class="column is-one-third"></div>
    </div>
    <hr>
    <!--TABLA-->
 <div class="columns">
      <div class="column is-one-third"></div>  
      <!-- Sección que renderiza la tabla con los productos agregados -->
      <section class="table-section column is-one-third">
        <h1 class="title is-4 has-text-centered">Recent Products</h1>
        <table class="table table-striped t-products">
          <thead>
            <tr>
              <th class="has-text-centered">Name</th>
              <th class="has-text-centered">Price</th>
              <th class="has-text-centered">Picture</th>
              <th colspan="2" class="action has-text-centered">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in computedProductList" :key="p.id">
              <td>{{ p.data.name }}</td>
              <td>{{ p.data.price }}</td>
              <td><img :src="p.data.picture" class="image is-48x48"></td> 
              <!-- Boton Editar -->
              <td>
                <button class="button is-primary" @click="editProduct(p.id)">
                  <span>Edit</span>
                </button>
                <div class="is-clearfix"></div>
              </td>
              <!-- Boton Borrar -->
              <td>
                 <button class="button is-danger is-outlined" @click="deleteProduct(p.id)">
                    <span>Delete</span>
                 </button>                  
                <div class="is-clearfix"></div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Volver al Home -->
        <div class="has-text-centered">
          <router-link to="/home" class="button is-primary">Back to Home</router-link>
        </div>
      </section>
      <div class="column is-one-third"></div>
    </div> 
  </div>
</template>

<script>
/* Aca se importan tanto el axios que hace conexión con la 
Base de Datos de Firebase, como el mapState / mapActions de Vuex (store.js) */
  import axios from 'axios' // Si las acciones son llamadas en store.js, este llamado no es necesario (en ese caso se llama en el mapActions en methods)
  import { mapState, mapActions } from 'vuex'

  export default {
    // Esta sección muestra que los campos del formulario están vacíos
    data() {
      return {
        name: '',
        picture: '',
        price: '',
        id: undefined,
      }
    },
    //
    methods: {
      // Este mapActions trae del store.js la acción que permite editar un producto
      ...mapActions(['updateEdit']),

    /* CRUD: CREATE, READ, UPDATE, DELETE
    En esta sección de methods se realizan las 4 fases principales del CRUD 
    (Se recomienda hacer esto en store.js para tener orden en el código y no saturar las vistas o componentes) */ 
    // Acción para Crear un producto
    // El método POST se usa para enviar peticiones de cambios de estados como puede ser una inserción de un recurso
    // Esto permite que si el formulario no tiene datos, avise al usuario que debe ingresar información
    createProduct(e) {
      // Esto hace que si el formulario no tiene datos, avise al usuario que debe ingresar información
      e.preventDefault()
      this.formHasErrors = this.name === '' || this.picture === '' || this.price === ''
      let result = {
        name: this.name,
        picture: this.picture,
        price: this.price
      }
      if (!this.formHasErrors) {
        console.log(result)
        axios.post('https://us-central1-tgdd3-f199f.cloudfunctions.net/products/product', result, 
        {headers:{'content-type':'application/json'}})
        .then((response) => {
          console.log(response);
          this.name = ''
          this.picture = ''
          this.price = ''
          this.id = ''
          alert('Product Succesfully Added')
          this.$store.dispatch('getProducts')
        })
        .catch(function(error) {
          console.log(error);
        });
      }  
    },
      // Acción para Eliminar un Producto
      // El método DELETE elimina un recurso específico (boton que se encuentra en la tabla)
      deleteProduct(id){
        let confirmation = confirm('Are you sure you want to delete this product?')
        if (confirmation){
            axios.delete(`https://us-central1-tgdd3-f199f.cloudfunctions.net/products/product/${id}`, 
            { headers: {'content-type': 'application/json' }})
            .then(() => {
              alert('Product Deleted')
              this.$store.dispatch('getProducts')
            })
          }
      },
      // Acción para Editar un Producto (boton que se encuentra en la tabla)
      editProduct(id){
        this.updateEdit()
        this.findProduct(id)
      },
     // Acción para traer productos
     // El método GET se envía una petición cuyo objetivo es traer información
      findProduct(id){
        axios.get(`https://us-central1-tgdd3-f199f.cloudfunctions.net/products/product/${id}`, 
        { headers:{'content-type':'aplication/json'}})
        .then((response)=>{
          this.name = response.data.name
          this.picture = response.data.picture
          this.price = response.data.price
          this.id = id
        })
      },
     // Acción para Actualizar un producto (limpia el formulario cuando se ingresa un nuevo producto)
     // El método PUT reemplaza los valores actuales con los valores de la petición
      updateProduct(id) {
        let result = {
          name: this.name,
          picture: this.picture,
          price: this.price
        }
        axios.put(`https://us-central1-tgdd3-f199f.cloudfunctions.net/products/product/${id}`, result, 
        { headers: { 'content-type': 'application/json' }})
          .then(() => {
            this.name = ''
            this.picture = ''
            this.price = ''
            this.id = ''
            alert('Product Updated')
            this.$store.dispatch('getProducts')
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },
    //
    computed: {
       /* En este apartado se renderizan los resultados que emite el formulario 
       (Igualmente, habrá un producto inicial que es el establecido en Firebase por defecto) */
      ...mapState(['products', 'edit']),
      computedProductList(){
        return this.products 
      }
    },
    //
    mounted() {
      this.$store.dispatch('getProducts')
    },
  }
</script>

<style lang="scss" scoped>

.form-container {
  padding: 2rem 2rem 2rem 2rem;
}

</style>