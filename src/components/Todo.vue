<template>
  <div>

    <form @submit.prevent="addTask">
      <input autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="task"
        required
        minlength="3"/>
    </form>

    <div class="todo">
      <b-list-group>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <b-list-group-item v-for="item in filteredTodos" :key="item.id" class="task">
            <i v-bind:class="{'fa fa-check-square': item.completed,  'fa fa-square': !item.completed}" aria-hidden="true" v-on:click="toggleTask(item.id, item.completed)"></i>
            <p v-if="item.completed" v-b-tooltip.hover :title="item.createdAt | formatDate">
              <s>{{ item.message }}</s>
            </p>
            <p v-else  v-b-tooltip.hover :title="item.createdAt | formatDate">
              {{ item.message }}
            </p>
            <i class="fa fa-trash" aria-hidden="true" v-on:click="removeTask(item.id)"></i>
          </b-list-group-item>
        </transition-group>
      </b-list-group>
    </div>

    <div class="todo-footer" v-show="items.length">
      <b-badge class="todo-pill" pill v-for="(val, key) in filters" :key="key" @click="visibility = key" href="#" variant="dark">{{ key | capitalize }}</b-badge>
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
    </div>

  </div>
</template>

<script>
import firebase from "../firebase.js";
import moment from "moment";
import { mapState } from "vuex";

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
};

export default {
  name: "Todo",
  data: () => ({
    task: "",
    visibility: "all",
    filters: filters
  }),
  computed: {
    ...mapState({
      user: state => state.user,
      items: state => state.tasks.tasks
    }),
    filteredTodos() {
      return filters[this.visibility](this.items);
    },
    remaining() {
      return this.items.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    addTask() {
      firebase.tasksCollection
        .add({
          createdAt: new Date(),
          message: this.task,
          createdBy: this.user.data.uid,
          completed: false
        })
        .then(() => {
          this.task = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleTask(id, completed) {
      firebase.tasksCollection
        .doc(id)
        .update({
          completed: !completed
        })
        .then(() => {
          console.log("Task Toggled");
        });
    },
    removeTask(id) {
      firebase.tasksCollection
        .doc(id)
        .delete()
        .then(() => {
          console.log("Task Removed");
        });
    }
  },
  filters: {
    formatDate: val => {
      if (!val) {
        return "-";
      }
      let date = val.toDate();
      return moment(date).fromNow();
    },
    pluralize: (n, w) => (n === 1 ? w : w + "s"),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo {
  height: 400px;
  overflow-y: auto;
}
input {
  width: 100%;
  border: 0;
  border-radius: 0;
  padding: 7px 20px;
  font-size: 1.3em;
  background-color: #323333;
  color: #fff;
  margin-bottom: 2px;
}

input:focus {
  outline: none !important;
  border: 0;
  box-shadow: 0;
}

.task {
  padding: 10px 20px 0 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  border-radius: 0;
  margin-bottom: 2px;
  color: #3e5252;
  text-align: left;
  user-select: none;
}

p {
  display: inline-block;
}

i {
  cursor: pointer;
  padding: 10px;
}

.fa-trash {
  float: right;
  color: #ff3232;
}

.todo-footer {
  padding: 10px;
  font-size: 1.1em;
}

.todo-footer .todo-pill {
  margin-right: 10px;
}

.todo-footer .todo-count {
  float: right;
  color: #323333;
}
</style>
