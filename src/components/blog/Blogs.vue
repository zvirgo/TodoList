<template>
  <v-container>
    <v-row>
      <!-- Blog entries-->
      <v-col class="flex" cols="8">
        <blog-list />
      </v-col>
      <!-- Side widgets-->
      <v-col class="flex" cols="4">
        <search class="mb-4" />
        <categories class="mb-4" />
        <side-widget />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BlogList from "./BlogList.vue";
import Categories from "./Categories.vue";
import Search from "./Search.vue";
import SideWidget from "./SideWidget.vue";
export default {
  components: { Search, Categories, SideWidget, BlogList },
  name: "Blogs",
};
</script>

<style>
</style>