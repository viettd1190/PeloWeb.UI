
<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm thời gian lặp lại</title-page>
      <v-container>
        <v-form ref="form" v-model="valid">
          <v-layout row justify-center>
            <v-text-field
              hide-details
              label="Tên"
              v-model="form.name"
              v-on:keyup="validateForm"
              :rule="rules"
              :clearable="true"
            ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-text-field
              hide-details
              label="Số ngày"
              v-model="form.day_count"
              v-on:keyup="validateForm"
              :rule="rules"
              type="number"
            ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-text-field
              hide-details
              label="Vị trí"
              v-model="form.sort_order"
              v-on:keyup="validateForm"
              :rule="rules"
              type="number"
            ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-card-actions>
              <v-btn class="default" @click="close()">Trở lại</v-btn>
              <v-btn class="primary" :disabled="!valid" @click="validate()"
                >Thêm mới</v-btn
              >
            </v-card-actions>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { async } from "q";
import TitlePage from "@/components/TitlePage";
import { messageResult, url } from "@/utils/index";
export default {
  components: { TitlePage },
  props: {},
  data() {
    return {
      form: {
        name: "",
        sort_order: 0,
        day_count: 0
      },
      rules: [value => !!value || "Thông tin không được trống"],
      valid: true
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["Create"]),
    validateForm(e) {
      if (e.keyCode === 13) {
        this.validate();
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.save();
      }
    },
    save() {
      if (this.form.name == "") {
        return;
      }
      let p = {
        name: this.form.name,
        sort_order: this.form.sort_order,
        day_count: this.form.day_count
      };
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.Create([url.task_loop.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          window.location.href = "#/Task/TaskLoop";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Task/TaskLoop";
    },
    updateColor(color) {
      this.form.color = color;
    }
  }
};
</script>
<style>
</style>