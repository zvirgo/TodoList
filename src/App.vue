<template>
  <div>
    <TopHeader />
  </div>
</template>

<script>
import TopHeader from "./components/TopHeader.vue";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "App",
  components: {
    TopHeader,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser", user);
      }
    });
  },
};
</script>
<style lang="scss">
a {
  color: black !important;
  text-decoration: none;
}
</style>
