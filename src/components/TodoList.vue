<template>
  <v-container>
    <NewTodo @reload="getTodoList" />
    <v-row class="flex justify-center">
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Date</th>
                <th class="text-left">Task Name</th>
                <th class="text-left">Status</th>
                <th class="text-left">Edit</th>
                <th class="text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in todos" :key="item.name">
                <td class="text-left">{{ item.date }}</td>
                <td class="text-left">{{ item.taskName }}</td>
                <td class="text-left">{{ item.status }}</td>
                <td class="text-left">
                  <v-btn class="orange" @click="editHandler(item)" dark
                    >Edit</v-btn
                  >
                </td>
                <td class="text-left">
                  <v-btn
                    class="error"
                    @click="deleteHandler(item.id, item.taskName)"
                    dark
                    >Delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <ConfirmDelete
      :showConfirm="showConfirm"
      :currentTask="currentTask"
      @disagree="showConfirm = false"
      @agree="deleteTodo"
    />
    <EditTodo
      :showEdit="showEdit"
      @closeEdit="showEdit = false"
      @saveEdit="editTodo"
      :currentTodo="currentTodo"
    />
  </v-container>
</template>

<script>
import { db } from "../main";
import ConfirmDelete from "./ConfirmDelete.vue";
import EditTodo from "./EditTodo.vue";
import NewTodo from "./NewTodo.vue";
export default {
  components: { NewTodo, ConfirmDelete, EditTodo },
  name: "TodoList",
  data() {
    return {
      todos: [],
      date: "",
      taskName: "",
      status: "",
      currentId: "",
      currentTask: "",
      currentTodo: {},
      showConfirm: false,
      showEdit: false,
    };
  },
  mounted() {
    this.getTodoList();
  },
  methods: {
    async getTodoList() {
      let items = await db.collection("todoList").get();
      let tododata = [];
      items.forEach((item) => {
        let data = item.data();
        data.id = item.id;
        tododata.push(data);
      });
      this.todos = tododata;
    },
    deleteHandler(currentId, currentTask) {
      this.showConfirm = true;
      this.currentId = currentId;
      this.currentTask = currentTask;
    },
    async deleteTodo() {
      await db
        .collection("todoList")
        .doc(this.currentId)
        .delete()
        .then(() => {
          this.getTodoList();
        });
      this.showConfirm = false;
    },
    editHandler(value) {
      this.showEdit = true;
      this.currentTodo = value;
    },
    async editTodo(value) {
      await db
        .collection("todoList")
        .doc(value.id)
        .update(value)
        .then(() => {
          this.showEdit = false;
        });
    },
  },
};
</script>

<style>
</style>