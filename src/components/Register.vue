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
    export default {
        data() {
            return {
                isAccepted: true
            }
        },
        methods: {
            submitForm() {
                //
                //
            }
        }
    }
</script>

<style lang="scss" scoped>
.login-container {
  padding: 2rem 1rem 0.5rem 1rem;
}
</style>