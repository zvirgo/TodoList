<template>
  <v-container>
    <v-row class="flex justify-center">
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-left">
                  <DataPicker :date="date" @todoDate="dateHandler($event)" />
                </td>
                <td class="text-left">
                  <v-text-field
                    prepend-icon="mdi-pencil"
                    v-model="taskName"
                    label="Task Name"
                  ></v-text-field>
                </td>
                <td class="text-left">
                  <v-select
                    prepend-icon="mdi-history"
                    v-model="status"
                    :items="statusOption"
                    label="Status"
                  ></v-select>
                </td>
                <td class="text-left">
                  <v-btn color="success" class="mr-4" @click="newTodo">
                    New Todo
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { db } from "../main";
import DataPicker from "./DataPicker.vue";

export default {
  components: { DataPicker },
  name: "NewTodo",
  data() {
    return {
      valid: true,
      todos: [],
      date: "",
      taskName: "",
      status: "",
      statusOption: ["Done", "In Progress", "Todo"],
    };
  },
  methods: {
    async newTodo() {
      let payload = {
        date: this.date,
        taskName: this.taskName,
        status: this.status,
      };
      let newTodoId = Date.now().toString();
      db.collection("todoList")
        .doc(newTodoId)
        .set(payload)
        .then(() => {
          this.$emit("reload");
        })
        .catch((error) => {
          console.log(error, "ServerError");
        })
        .finally(() => {
          (this.date = ""), (this.taskName = ""), (this.status = "");
        });
    },
    dateHandler(value) {
      this.date = value.date;
    },
  },
};
</script>

<style>
</style>