<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <RouterLink :to="{ name: 'login' }">Have an account?</RouterLink>
          </p>
          <AppValidationErrors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppValidationErrors from "@/components/ValidationErrors";
import { actionTypes } from "@/store/modules/auth";
export default {
  name: "AppRegister",
  components: {
    AppValidationErrors,
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(() => this.$router.push({ name: "globalFeed" }));
    },
  },
};
</script>
