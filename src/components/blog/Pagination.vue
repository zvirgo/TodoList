<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="length"
      @input="changePage"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      page: 1,
    };
  },
  props: {
    length: {
      type: Number,
      require: true,
    }
  },
  computed: {
    
  },
  methods:{
      changePage(page){
          this.$emit('changePage',page)
      }
  }
};
</script>

<style>
</style>