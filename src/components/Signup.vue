<template>
  <v-container>
    <v-row class="justify-center text-center">
      <v-col class="flex" cols="12" sm="6">
        <v-card>
          <v-toolbar dark color="cyan lighten-1">
            <v-toolbar-title>Sign up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                prepend-icon="mdi-email"
                v-model="email"
                label="E-mail"
                required
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
              <v-text-field
                prepend-icon="mdi-lock"
                v-model="confirmPassword"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                name="confirmPassword"
                label="Confirm Password"
                class="input-group--focused"
                @click:append="showPassword = !showPassword"
                :error="!valid()"
              ></v-text-field>
              <v-btn
                v-if="!waitRequest"
                color="success"
                class="mr-4"
                @click="signup"
              >
                Sign up
              </v-btn>
              <v-btn v-if="waitRequest" class="mr-4" @click="signup">
                <v-progress-circular  :width="3" :size="25" indeterminate color="green">
                </v-progress-circular>
                Waiting...
              </v-btn>
            </v-form>
            <span
              >Already have an account?
              <router-link to="/login">Login</router-link>
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
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",

      showPassword: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      waitRequest: false,
    };
  },
  methods: {
    async signup() {
      try {
        this.waitRequest = true;
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.replace({ name: "todoList" });
          });
      } catch (err) {
        this.waitRequest = false;
        alert("Error-${err.message}");
      }
    },
    valid() {
      return this.password === this.confirmPassword;
    },
  },
};
</script>

<style>
.v-progress-circular {
  margin: 1rem;
}
</style>