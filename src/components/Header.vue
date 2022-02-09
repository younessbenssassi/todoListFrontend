<template>
  <div class="row">
    <div class="col-md-12">
      <h2>My Todo's({{ todos.length }})</h2>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  name: "Header",
  computed:{
    ...mapGetters({
      todos:'todos/get_stored_todos',
    }),
  }
}
</script>
