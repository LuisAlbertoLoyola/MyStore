<template>
    <div>
        <div class="columns">
            <div class="column is-one-third"></div>
            <div class="column is-one-third">
                <div class="login-container card">
                    <form>
                        <div>
                            <h1 class="title text-center">Register</h1>
                        </div>
                        <!-- Name Field -->
                        <div class="field">
                            <label class="label">Name</label>
                            <div>
                                <input type="text" placeholder="Please enter your name" class="input">
                            </div>
                        </div>
                        <!-- Email Field -->
                        <div class="field">
                            <label class="label">Email</label>
                            <div>
                                <input type="email" placeholder="Please enter your email" class="input">
                            </div>
                        </div>
                        <!-- Password Field -->
                        <div class="field">
                            <label class="label">Password</label>
                            <div>
                                <input type="password" placeholder="Please enter your password" class="input">
                            </div>
                        </div>
                        <!-- Checkbox -->
                        <div>
                            <input type="checkbox" v-model='isAccepted'>
                        </div>
                        <!-- Submit Field-->
                        <div class="field">
                            <button type="submit" :class='{"is-disabled": !isAccepted}'
                            @click='submitForm'>Registrar</button>
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