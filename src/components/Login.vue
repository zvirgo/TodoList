<template>
  <v-container>
    <v-row class="justify-center text-center">
      <v-col class="flex" cols="12" sm="6">
        <v-card>
          <v-toolbar dark color="green darken-1">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                prepend-icon="mdi-email"
                v-model="email"
                label="E-mail"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                class="input-group--focused"
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-btn
                v-if="!waitRequest"
                color="success"
                class="mr-4"
                @click="logedin"
              >
                Login
              </v-btn>
              <v-btn v-if="waitRequest" class="mr-4" @click="signup">
                <v-progress-circular indeterminate color="green">
                </v-progress-circular>
                Waiting...
              </v-btn>
            </v-form>
            <span class="mt-5"
              >Don't have an account?
              <router-link to="/signup">Signup</router-link>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      waitRequest: false,
    };
  },
  methods: {
    async logedin() {
      try {
        this.waitRequest = true;
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.replace({ name: "todoList" });
          });
      } catch (err) {
        this.waitRequest = false;
      }
    },
  },
};
</script>

<style>
</style>