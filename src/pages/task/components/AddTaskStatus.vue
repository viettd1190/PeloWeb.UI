
<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm trạng thái công việc</title-page>

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
              label="Vị trí"
              v-model="form.sort_order"
              v-on:keyup="validateForm"
              :rule="rules"
              type="number"
            ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-checkbox
              label="Gửi Sms"
              v-model="form.sendSms"
              :value="form.sendSms"
            ></v-checkbox>
          </v-layout>
          <v-layout row wrap>
            <v-textarea
              v-model="form.sms_content"
              type="text"
              name="input-10-1"
              label="Nội dung sms"
            ></v-textarea>
          </v-layout>
          <v-layout row justify-center style="padding-bottom:20px">
            <color-picker
              :selectColor="form.color"
              @updateColor="updateColor"
            ></color-picker>
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
import ColorPicker from "@/components/ColorPicker";
export default {
  components: { TitlePage, ColorPicker },
  props: {},
  data() {
    return {
      form: {
        name: "",
        color: "#59c7f9",
        sendSms: false,
        sms_content: "",
        sort_order: 1
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
      if (this.form.name == "" || this.form.color == "") {
        return;
      }
      let p = {
        name: this.form.name,
        color: this.form.color,
        is_send_sms: this.form.sendSms,
        sms_content: this.form.sms_content,
        sort_order: this.form.sort_order
      };
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.Create([url.task_status.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          window.location.href = "#/Task/TaskStatus";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Task/TaskStatus";
    },
    updateColor(color) {
      this.form.color = color;
    }
  }
};
</script>
<style>
</style>