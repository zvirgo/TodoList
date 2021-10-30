<template>
  <v-container>
    <v-row v-if="!loading">
      <v-col class="flex" cols="12">
        <singleblog :post="posts[0]" />
      </v-col>
      <v-col
        class="flex"
        cols="6"
        v-for="(postGroup, index) in posts.slice(1)"
        :key="index"
      >
        <singleblog
          class="mb-5"
          v-for="post in postGroup"
          :key="post.id"
          :post="post"
        />
      </v-col>
    </v-row>
    <v-row v-else> Loading... </v-row>
    <pagination :length="6" @changePage="changePage($event)" />
  </v-container>
</template>

<script>
import Singleblog from "./Singleblog.vue";
import axios from "axios";
import _ from "underscore";
import Pagination from "./Pagination.vue";
export default {
  components: { Singleblog, Pagination },
  name: "BlogList",
  data() {
    return {
      posts: null,
      loading: false,
    };
  },
  created() {
    this.getPostData(1);
  },
  methods: {
    changePage(page) {
      this.getPostData(page);
    },
    getPostData(page = 1) {
      this.loading = true;
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=9`
        )
        .then((response) => {
          this.loading = false;
          this.posts = response.data;
          let mainPost = this.posts.shift();
          this.posts = [mainPost, ..._.chunk(this.posts, 2)];
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>