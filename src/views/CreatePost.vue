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
            @imageAdded="handleImageAdded"
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
          <v-btn color="success" @click="uploadBlog" class="mr-4 mt-4">
            Publish Blog
          </v-btn>
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
// import { db } from "../main";
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
      useCustomImageHandler: true,
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
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
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
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      debugger;
      const docRef = firebase
        .storage()
        .ref()
        .child(`documents/blogPostPhotos/${this.file.name}`);
      debugger;
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
    uploadBlog() {
      if (this.blogTitle.length !== 0 && this.blogHTML) {
        if (this.file) {
          return;
        }
        this.$toast.error("Please ensure you uploaded a cover photo!", {
          timeout: 2000,
          position: "bottom-right",
        });
        return;
      }
      this.$toast.error(
        "Please ensure Blog Title & Blog Post has been filled!",
        {
          timeout: 2000,
          position: "bottom-right",
        }
      );
      return;
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