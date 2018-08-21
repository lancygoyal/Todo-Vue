import firebase from "../../firebase.js";

// initial state
const state = {
  isLogin: false,
  data: null
};

// actions
const actions = {
  clearData({ commit }) {
    commit("setUserProfile", null);
  },
  setUserProfile({ commit }) {
    commit("setUserProfile", firebase.auth.currentUser);
  }
};

// mutations
const mutations = {
  setUserProfile(state, data) {
    state.isLogin = data ? true : false;
    state.data = data;
  }
};

export default {
  state,
  actions,
  mutations
};
