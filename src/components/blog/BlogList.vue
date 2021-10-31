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
          :key="post.source.id"
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
          `https://newsapi.org/v2/everything?q=Apple&from=2021-10-30&page=${page}&pageSize=9&sortBy=popularity&apiKey=22da5d0f616f41bc99cbae18aabb5c0d`
        )
        .then((response) => {
          this.loading = false;
          // console.log(response.data.articles);
          this.posts = response.data.articles;
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