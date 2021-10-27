<template>
  <v-container>
    <v-row>
      <v-col class="flex" cols="12">
        <singleblog />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Singleblog from "./Singleblog.vue";
export default {
  components: { Singleblog },
  name: "BlogList",
};
</script>

<style>
</style>