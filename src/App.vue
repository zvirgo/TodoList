<template>
  <div>
    <TopHeader/>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'

export default {
  name: "App",
  components: {
    TopHeader
  }
};
</script>
<style lang="scss">
a {
    color: black !important;
    text-decoration: none;
}
</style>
