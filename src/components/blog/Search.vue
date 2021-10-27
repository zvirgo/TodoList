<template>
  <div class="byField">
    <div class="fieldTitle">
      <p class="text-h7 mb-0">Search</p>
    </div>
    <div class="fieldContent">
      <v-text-field
        solo
        hide-details
        label="Enter search term..."
        append-icon=" mdi-text-box-search-outline"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
};
</script>

<style>
</style>