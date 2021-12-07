<template>
  <div class="text-center">
    <v-dialog v-model="showModal" width="500">
      <v-card>
        <v-card-title class="text-p"> {{ title }} </v-card-title>
        <v-card-text>
          Are You sure change {{ currentProfile }}'s profile ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="disagree">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="agree"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "Warning !!!",
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    currentProfile: {
      type: String,
    },
  },
  methods: {
    disagree() {
      this.$emit("disagree");
    },
    agree() {
      this.$emit("agree");
    },
  },
};
</script>

<style>
</style>