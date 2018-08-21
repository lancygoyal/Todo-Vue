<template>
  <div class="home">
    <Todo/>
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo.vue";

export default {
  name: "home",
  components: {
    Todo
  }
};
</script>
