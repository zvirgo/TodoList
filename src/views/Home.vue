<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-date-picker
          v-model="picker"
          elevation="15"
          color="orange"
          full-width
          :landscape="$vuetify.breakpoint.smAndUp"
          no-title
          class="mt-3"
        ></v-date-picker>
      </v-col>
      <v-col cols="12" md="8"> <Login /> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "../components/Login";

export default {
  components: { Login },
  name: "Home",

  data() {
    return {};
  },
};
</script>
