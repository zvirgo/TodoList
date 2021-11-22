<template>
  <v-container>
    <v-row class="justify-center text-center">
      <v-col class="flex" cols="12" sm="6">
        <v-card>
          <v-toolbar dark color="indigo lighten-1 ">
            <v-toolbar-title> Account Setting</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-avatar color="cyan darken-1">
              <span class="white--text text-p text-uppercase">{{
                profileInitials
              }}</span>
            </v-avatar>
            <v-form ref="form">
              <v-text-field
                prepend-icon="mdi-account"
                v-model="userName"
                label="User Name"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                v-model="firstName"
                label="First Name"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                v-model="lastName"
                label="Last Name"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-email"
                v-model="email"
                label="E-mail"
              >
              </v-text-field>
              <v-btn
                color="success"
                class="mr-4"
                @click="changeHandler"
              >
                Save Changes
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <modal
      :currentProfile="currentProfile"
      :showModal="showModal"
      @agree="updateProfile"
      @disagree="showModal = false"
    />
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Modal from "./Modal.vue";

export default {
  name: "profile",
  components: { Modal },
  data() {
    return {
      showModal: false,
      currentProfile: "",
    };
  },

  computed: {
    ...mapState([
      "profileInitials",
      "profileUserName",
      "profileEmail",
      "profileLastName",
      "profileFirstName",
      "profileId",
    ]),
    firstName: {
      get() {
        return this.profileFirstName;
      },
      set(payload) {
        this.$store.commit("changeFirstName", payload);
      },
    },
    lastName: {
      get() {
        return this.profileLastName;
      },
      set(payload) {
        this.$store.commit("changeLastName", payload);
      },
    },
    userName: {
      get() {
        return this.profileUserName;
      },
      set(payload) {
        this.$store.commit("changeUserName", payload);
      },
    },
    email() {
      return this.profileEmail;
    },
  },
  methods: {
    ...mapActions(["updateUserSettings"]),
    changeHandler() {
      this.showModal = true;
      this.currentProfile = this.profileUserName;
    },
    updateProfile() {
      this.updateUserSettings();
      this.showModal = false;
    },
  },
};
</script>

<style>
</style>