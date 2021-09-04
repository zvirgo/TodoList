<template>
  <v-row justify="center">
    <v-dialog v-model="showConfirm" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
            {{title}}
        </v-card-title>
        <v-card-text
          >Are You sure Delete {{currentTask}} ?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="disagree">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="agree">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ConfirmDelete",
  data() {
    return {
    //   showConfirm: false,
    };
  },
  props:{
      title:{
          type:String,
          default:"Warning !!!"
      },
      content:{
          type:String,
      },
      showConfirm:{
          type:Boolean,
          default:false
      },
      currentTask:{
          type:String
      }
  },
  methods:{
    disagree(){
        this.$emit("disagree")
    },
    agree(){
        this.$emit("agree")
    }
  }
};
</script>

<style>
</style>