<template>
  <v-card class="mx-auto">
    <v-img
      class="white--text align-end img-responsive"
      height="200px"
      :src="post.urlToImage"
    >
    </v-img>

    <v-card-subtitle class="pb-0"> {{ this.date }} </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>
        <p class="text-h5 text--primary news-title">{{ this.title }}</p>
      </div>

      <div>
        <p class="news-description">{{ post.description }}</p>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" text :href="post.url">
        Read more
        <v-icon right dark>mdi-arrow-right </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "single-blog",
  data() {
    return {
      date: "",
      title: "",
    };
  },
  props: ["post"],
  created() {
    this.date = this.post.publishedAt.substring(0, 10);
    this.title = this.post.title.substring(0, 50);
  },
};
</script>

<style lang="scss" scoped>
.news-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.news-description {
  max-height: 100px;
}
</style>