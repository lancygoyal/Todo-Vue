import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebase.js";
import tasks from "./modules/tasks.js";
import user from "./modules/user.js";

Vue.use(Vuex);

let unsubscribe = null;
firebase.auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch("setUserProfile");

    // realtime updates from our tasks collection
    unsubscribe = firebase.tasksCollection
      .where("createdBy", "==", user.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        let taskssArray = [];
        querySnapshot.forEach(doc => {
          let task = doc.data();
          task.id = doc.id;
          taskssArray.push(task);
        });
        store.commit("setTasks", taskssArray);
      });
  } else {
    store.commit("setTasks", []);
    store.commit("setUserProfile", null);
    unsubscribe && unsubscribe();
  }
});

const store = new Vuex.Store({
  modules: {
    tasks,
    user
  }
});

export default store;
