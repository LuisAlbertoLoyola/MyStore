<template>
  <div> 
    <div class="columns" style="height: 70vh">
      <div class="column is-one-third"></div>
      <div class="column is-one-third" id="container">
        <div class="login-container card">
          <form>
            <!-- Field email -->
            <div class="field">
              <!-- Error -->
              <span v-if="formHasErrors" class="has-text-danger">
                <i class="mdi mdi-alert"></i>
                Incorrect User or Password. Try again.
              </span>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input type="email" name="email" id="email" placeholder="Email"
                v-model="credentials.email"
                class="input">
                <span class="icon is-small is-left">
                  <i class="mdi mdi-email"></i>
                </span>
              </div>
            </div>
            <!-- Field password -->
            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input type="password" name="password" id="password" placeholder="*******"
                v-model="credentials.password"
                class="input">
                <span class="icon is-small is-left">
                  <i class="mdi mdi-key"></i>
                </span>
              </div>
            </div>
            <!-- field submit -->
            <div class="field">
              <button class="button is-primary is-pulled-right" @click="login">Login</button>
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
import Firebase from 'firebase'

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      formHasErrors: false
    }
  },
  methods: {
    login(e) {
      e.preventDefault()
      this.formHasErrors = this.credentials.email === '' || this.credentials.password === ''
      if(!this.formHasErrors) {
        // try login
        Firebase.auth()
              .signInWithEmailAndPassword(
                this.credentials.email,
                this.credentials.password
              )
        .then(() => {
          let user = this.credentials.email
          this.$store.dispatch('updateUser', user)
          this.$router.push('/')
          alert(`Welcome ${this.credentials.email}`)
        })
        .catch(() => {
          alert(`Wrong username or password`)
        })
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.login-container {
  padding: 2rem 2rem 2rem 2rem;
}

</style>