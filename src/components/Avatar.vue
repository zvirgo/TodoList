<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="white" size="32">
          <span class="blue--text text-p text-uppercase">{{ profileInitials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content>
        <div class="mx-auto text-center">
          <v-avatar color="blue darken-1">
            <span class="white--text text-p text-uppercase">{{ profileInitials }}</span>
          </v-avatar>
          <h3>{{ profileUserName }}</h3>
          <p class="text-caption mt-1">
            {{ profileEmail }}
          </p>
          <v-divider class="my-1"></v-divider>
          <router-link to="/profile">
            <v-btn icon>
              <v-icon class="pr-4"> mdi-account </v-icon> Profile
            </v-btn>
          </router-link>
          <v-divider class="my-1"></v-divider>
          <v-btn @click="signOut" icon>
            <v-icon class="pr-4"> mdi-logout </v-icon> Sign Out
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";
export default {
  name: "avatar",
  data() {
    return {};
  },
  methods: {
    signOut() {
      try {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({ name: "login" });
          });
      } catch (err) {
        console.log("error");
      }
    },
  },
  computed: {
    ...mapState(["profileUserName", "profileEmail", "profileInitials"]),
  },
};
</script>

<style>
</style>