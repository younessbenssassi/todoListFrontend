<template>
  <div class="container">
    <Header />
    <div class="row">
      <div class="col-md-12">
        <div class="card card-white">
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <el-select
                    v-model="type"
                    placeholder="Select users"
                    @change="changeUserType"
                >
                  <el-option
                      value="user"
                      label="User"
                  >
                  </el-option>
                  <el-option
                      value="admin"
                      label="Admin"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="col-md-3">
                <el-select
                    v-model="selectedUsers"
                    placeholder="Select admins"
                    multiple
                >
                  <el-option
                      v-for="user in allUsers"
                      :key="user.id"
                      :value="user.id"
                      :label="user.name"
                  >
                  </el-option>
                </el-select>
              </div>
              <div :class="todo.id ? 'col-md-5' :'col-md-6'">
                <input
                    type="text"
                    class="form-control add-task"
                    placeholder="Add new todo (hit enter to add)"
                    v-model="todo.title"
                    v-on:keyup.enter="createEditTodo"
                >
              </div>
              <div class="col-md-1" v-if="todo.id">
                <a
                    @click.prevent="createEditTodo"
                    href="javascript:void(0);"
                    class="float-right"
                >
                  save
                </a>
              </div>
            </div>
            <div class="todo-list">
              <div class="todo-item" v-for="todo in todos" :key="todo.id">
                <div class="row">
                  <div class="col-md-1">
                    <span class="">
                        <input
                            type="checkbox"
                            :checked="todo.status"
                            @change="toggleStatus(todo)"
                        >
                      </span>
                  </div>
                  <div class="col-md-9">
                    <div :class="{'done':todo.status}" class="row">
                      <div class="col-md-6">
                        <h3>{{ todo.title }}</h3>
                      </div>
                      <div class="col-md-3">
                        <el-select
                            v-model="todo.users_ids"
                            placeholder="Select users"
                            @change="createEditTodo(todo)"
                            :disabled="todo.status"
                            multiple
                        >
                          <el-option
                              v-for="user in users"
                              :key="'userSelector'+user.id"
                              :value="user.id"
                              :label="user.name"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <div class="col-md-3">
                        <el-select
                            v-model="todo.admins_ids"
                            placeholder="Select admins"
                            @change="createEditTodo(todo)"
                            :disabled="todo.status"
                            multiple
                        >
                          <el-option
                              v-for="user in admins"
                              :key="'adminSelector'+user.id"
                              :value="user.id"
                              :label="user.name"
                          >
                          </el-option>
                        </el-select>
                      </div>

                    </div>
                  </div>
                  <div class="col-md-2">
                    <a
                        @click.prevent="deleteTodo(todo)"
                        href="javascript:void(0);"
                        class="float-right error"
                    >
                        Delete
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import UsersController from "@/controllers/UsersController";
import AdministratorsController from "@/controllers/AdministratorsController";
import TodosController from "@/controllers/TodosController";
import {mapActions} from "vuex";
export default {
  name: "listings",
  components:{
    Header,
  },
  data(){
    return{
      todos:[],
      users:[],
      admins:[],
      allUsers:[],
      selectedUsers:[],
      type:'user',
      todo:{
        title:'',
        admins_ids:[],
        users_ids:[],
      },
    }
  },
  methods:{
    ...mapActions({
      'set_todos':'todos/set_todos',
    }),
    changeUserType(){
      this.selectedUsers = [];
      this.todo.admins_ids = [];
      this.todo.users_ids = [];
      if(this.type === 'user')
        this.allUsers = this.users;
      else
        this.allUsers = this.admins;
    },
    async getUsers(){
      let controller = new UsersController();
      let response = await controller.getUsers();
      if(response.status){
        this.users = response.users;
        this.allUsers = this.users;
      }
    },
    async getAdmins(){
      let controller = new AdministratorsController();
      let response = await controller.getAdministrators();
      if(response.status){
        this.admins = response.administrators;
      }
    },

    async getTodos(){
      let controller = new TodosController();
      let response = await controller.getTodos();
      if(response.status){
        this.todos = response.todos;
        this.set_todos(this.todos);
      }
    },

    async createEditTodo(todo){
      if(todo && todo.id){
        let controller = new TodosController();
        let response = await controller.editTodo(todo);
        if(response.status){
          await this.getTodos();
        }
      }else{
        if(this.type === 'user'){
          this.todo.users_ids = this.selectedUsers;
          this.todo.user_type = this.type;
        }
        else{
          this.todo.admins_ids = this.selectedUsers;
          this.todo.user_type = this.type;
        }
        let controller = new TodosController();
        let response = await controller.addTodo(this.todo);
        if(response.status){
          await this.getTodos();
          this.todo={
            title:'',
            admins_ids:[],
            users_ids:[],
          };
          this.selectedUsers = [];
          this.type = 'user';
        }
      }
    },
    async deleteTodo(todo){
      let controller = new TodosController();
      let response = await controller.deleteTodo(todo.id);
      if(response.status){
        await this.getTodos();
      }
    },
    async toggleStatus(todo){
      let controller = new TodosController();
      let response = null;
      if(todo.status)
        response = await controller.markAsNotDone(todo.id);
      else
        response = await controller.markAsDone(todo.id);
      if(response.status){
        await this.getTodos();
      }
    },
  },
  async mounted(){
    await Promise.all([
      this.getTodos(),
      this.getUsers(),
      this.getAdmins(),
    ]);
  },
}
</script>

<style scoped>
.typo__label {
  font-weight: 400;
  font-size: .875rem;
  color: #bbb;
  margin: 1.25rem 0 0.625rem;
}
body{
  margin-top:20px;
  background: #f8f8f8;
}

.todo-nav {
  margin-top: 10px
}

.todo-list {
  margin: 10px 0
}

.todo-list .todo-item {
  padding: 15px;
  margin: 5px 0;
  border-radius: 0;
  background: #f7f7f7
}

.todo-list.only-active .todo-item.complete {
  display: none
}

.todo-list.only-active .todo-item:not(.complete) {
  display: block
}

.todo-list.only-complete .todo-item:not(.complete) {
  display: none
}

.todo-list.only-complete .todo-item.complete {
  display: block
}

.todo-list .todo-item.complete span {
  text-decoration: line-through
}

.remove-todo-item {
  color: #ccc;
  visibility: hidden
}

.remove-todo-item:hover {
  color: #5f5f5f
}

.todo-item:hover .remove-todo-item {
  visibility: visible
}

div.checker {
  width: 18px;
  height: 18px
}

div.checker input,
div.checker span {
  width: 18px;
  height: 18px
}

div.checker span {
  display: -moz-inline-box;
  display: inline-block;
  zoom: 1;
  text-align: center;
  background-position: 0 -260px;
}

div.checker, div.checker input, div.checker span {
  width: 19px;
  height: 19px;
}

div.checker, div.radio, div.uploader {
  position: relative;
}

div.button, div.button *, div.checker, div.checker *, div.radio, div.radio *, div.selector, div.selector *, div.uploader, div.uploader * {
  margin: 0;
  padding: 0;
}

div.button, div.checker, div.radio, div.selector, div.uploader {
  display: -moz-inline-box;
  display: inline-block;
  zoom: 1;
  vertical-align: middle;
}

.card {
  padding: 25px;
  margin-bottom: 20px;
  border: initial;
  background: #fff;
  border-radius: calc(.15rem - 1px);
  box-shadow: 0 1px 15px rgba(0,0,0,0.04), 0 1px 6px rgba(0,0,0,0.04);
}
.done{
  text-decoration: line-through;
}
</style>