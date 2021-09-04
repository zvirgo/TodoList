<template>
  <v-menu
    ref="datePicker"
    v-model="datePicker"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Date"
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="datePicker = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DataPicker",
  data() {
    return {
      datePicker: false,
    };
  },
  props: {
    date: String,
  },
  watch: {
    date() {
      this.$emit("todoDate", { date: this.date });
    },
  },
};
</script>

<style>
</style>