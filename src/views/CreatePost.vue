<template>
  <v-container>
    <v-row class="d-flex align-center">
      <v-col cols="4">
        <v-text-field
          label="Enter Blog Title"
          :v-model="postTitle"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-file-input
          @change="fileChange"
          ref="blogPhoto"
          accept="image/*"
          label="Upload Cover Photo"
        ></v-file-input>
      </v-col>
      <v-col cols="4">
        <v-btn
          depressed
          :disabled="!blogPhotoFileURL"
          @click="blogPhotoPreview"
          class="mr-4"
        >
          Preview Photo
        </v-btn>
        <span>File Chosen: {{ blogPhotoName }} </span>
      </v-col>
      <v-col cols="12">
        <div class="editor">
          <vue-editor
            v-model="postHTML"
            @imageAdded="imageHandler"
            :editorOptions="editorSettings"
          />
        </div>
      </v-col>
      <v-col cols="12" class="mt-5">
        <div class="editorBtn">
          <router-link :to="{ name: 'post-preview' }">
            <v-btn color="blue darken-1" dark class="mr-4 mt-4">
              Post Preview
            </v-btn>
          </router-link>
          <v-btn color="success" class="mr-4 mt-4"> Publish Blog </v-btn>
        </div>
      </v-col>
    </v-row>
    <blog-cover-preview
      :showPreview="showPreview"
      @closePreview="showPreview = false"
    />
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "CreatePost",
  components: { BlogCoverPreview, VueEditor },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      showPreview: false,
      editorSettings: {
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
    profileId() {
      return this.profileId;
    },
    blogCoverPhotoName() {
      return this.blogPhotoName;
    },
    postTitle: {
      get() {
        return this.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    postHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      },
    },
  },
  methods: {
    fileChange(image) {
      this.file = image;
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },
    blogPhotoPreview() {
      this.showPreview = true;
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      debugger;
      const docRef = firebase
        .storage()
        .ref()
        .child(`documents/blogPostPhotos/${this.file.name}`);
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot, "snapshot");
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  height: 60vh;
  display: flex;
  flex-direction: column;
  .quillWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .ql-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
  }
  .ql-editor {
    padding: 20px 16px 30px;
  }
}
</style>