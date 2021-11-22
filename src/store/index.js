import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    profileFirstName: null,
    profileLastName: null,
    profileEmail: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
    
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,

  },
  mutations: {
    setProfileInfo(state, value) {
      state.profileId = value.id;
      state.profileEmail = value.data().email;
      state.profileUserName = value.data().userName;
      state.profileFirstName = value.data().firstName;
      state.profileLastName = value.data().lastName;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUserName(state, payload) {
      state.profileUserName = payload;
    },

  },
  actions: {
    async getCurrentUser({ commit }) {
      const dbResults = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        userName: state.profileUserName,
      });
      commit("setProfileInitials");
    },
  },
  modules: {},
});
