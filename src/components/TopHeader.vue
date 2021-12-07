<template>
  <v-app>
    <v-app-bar app color="blue darken-1" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>ِDashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <Avatar v-if="user"/>
      <router-link v-else to="/login">
        <v-btn icon > <v-icon> mdi-account-plus </v-icon></v-btn>
      </router-link>
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
              <v-icon>mdi-newspaper-variant-multiple </v-icon>
            </v-list-item-icon>
            <router-link to="/blogs">
              <v-list-item-title>News</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-post-outline </v-icon>
            </v-list-item-icon>
            <router-link to="/createPost">
              <v-list-item-title>Create Post</v-list-item-title>
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
import { mapState } from "vuex";
import Avatar from "./Avatar.vue";
export default {
  name: "TopHeader",
  components: {
    Avatar,
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      drawer: false,
      group: null,
    };
  },
  methods: {},
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>