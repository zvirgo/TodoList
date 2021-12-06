<template>
  <v-dialog
    v-model="showPreview"
    width="500"
    class="m-5"
  >
    <v-card>
      <v-img :src="this.blogPhotoFileURL" contain ></v-img>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text @click="closePreview">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "blog-cover-preview",
  props: {
    showPreview: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["blogPhotoFileURL"]),
  },
  methods: {
    closePreview() {
      this.$emit("closePreview");
    },
  },
};
</script>

<style>
</style>