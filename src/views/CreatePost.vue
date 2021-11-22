<template>
  <v-container>
    <v-row class="d-flex align-center">
      <v-col cols="4">
        <v-text-field
          label="Enter Blog Title"
          v-model="blogTitle"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-file-input
          accept=".png, .jpg, .jpeg"
          label="Upload Cover Photo"
        ></v-file-input>
      </v-col>
      <v-col cols="4">
        <v-btn
          color="danger darken-1"
          class="mr-4"
          :disabled="!blogPhotoFileURL"
          dark
        >
          Preview Photo</v-btn
        >
        <span>File Chosen: {{blogPhotoName}} </span>
      </v-col>
      <v-col cols="12">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
        />
        <v-btn color="blue darken-1" dark class="mr-4 mt-4">
          Post Preview
        </v-btn>
        <v-btn color="success" class="mr-4 mt-4"> Publish Blog </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "CreatePost",
  components: {},
  data() {
    return {
      error: null,
      errorMsg: null,
      editorSetting: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  computed: {
    ...mapState([
      "blogPhotoName",
      "profileId",
      "blogTitle",
      "blogHTML",
      "blogPhotoFileURL",
    ]),
  },
};
</script>

<style lang="scss" scoped>
</style>