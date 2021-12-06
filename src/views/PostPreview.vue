<template>
  <v-container>
    <v-row class="d-flex align-center">
      <h2>{{ this.blogTitle }}</h2>
      <img :src="blogCoverPhoto" alt="" />
      <div v-html="blogHTML"></div>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "post-preview",
  computed: { ...mapState(["blogTitle", "blogHTML"]) },
};
</script>

<style>
</style>