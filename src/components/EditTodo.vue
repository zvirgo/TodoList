<template>
  <v-row justify="center">
    <v-dialog v-model="showEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit TodoList</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <DataPicker :date="currentTodo.date" @todoDate="dateHandler($event)" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="currentTodo.taskName" label="Task Name">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select v-model="currentTodo.status" :items="statusOption" label="Status">
                </v-select></v-col
              >
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeEdit"> Close </v-btn>
          <v-btn color="green darken-1" text @click="saveEdit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import DataPicker from "../components/DataPicker.vue";

export default {
  components: {
    DataPicker,
  },
  data() {
    return {
      date: "",
      taskName: "",
      status: "",
      statusOption: ["Done", "In Progress", "Todo"],
    };
  },
  props: {
    showEdit: {
      type: Boolean,
      default: false,
    },
    currentTodo: {
      type: Object,
    },
  },
  methods: {
    closeEdit() {
      this.$emit("closeEdit");
    },
    saveEdit() {
      this.$emit("saveEdit",this.currentTodo);
    },
    dateHandler(value) {
      this.currentTodo.date = value.date;
    },
  },
};
</script>

<style>
</style>