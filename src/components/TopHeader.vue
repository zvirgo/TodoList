<template>
  <v-app>
    <v-app-bar app color="blue darken-1" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>ِDashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/signup">
        <v-btn icon> <v-icon> mdi-account-plus </v-icon></v-btn>
        </router-link>
      <v-btn @click="signOut" icon> <v-icon> mdi-logout </v-icon> </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <router-link to="/">
              <v-list-item-title>Home</v-list-item-title>
            </router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <router-link to="/todoList">
              <v-list-item-title>Todo List</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-post-outline </v-icon>
            </v-list-item-icon>
            <router-link to="/blogs">
              <v-list-item-title>Blogs</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "TopHeader",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      drawer: false,
      group: null,
    };
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
};
</script>

<style>
</style>