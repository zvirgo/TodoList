<template>
  <v-card class="mx-auto">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    </v-img>

    <v-card-subtitle class="pb-0"> January 1, 2021 </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>
        <p class="text-h4 text--primary">Post Title</p>
      </div>

      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
        aliquid atque, nulla.
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" text>
        Read more
        <v-icon right dark>mdi-arrow-right </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "single-blog",
};
</script>

<style>
</style>