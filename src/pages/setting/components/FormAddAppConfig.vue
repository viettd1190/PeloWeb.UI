<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm tham số cấu hình</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-text-field
                v-model="form.name"
                :rules="[rules.required]"
                type="text"
                name="input-10-1"
                label="Tên"
              ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-text-field
                v-model="form.value"
                :rules="[rules.required]"
                type="text"
                name="input-10-1"
                label="Giá trị"
              ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-textarea
                v-model="form.description"
                type="text"
                name="input-10-1"
                label="Ghi chú"
              ></v-textarea>
          </v-layout>
          <v-layout row justify-center>
            <v-card-actions>
              <v-btn class="default" @click="close()">Trở lại</v-btn>
              <v-btn class="primary" :disabled="!valid" @click="validate()"
                >Thêm mới</v-btn
              >
            </v-card-actions>
          </v-layout>
        </v-container>
      </v-form>
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
      form: { name: "", value: "", description: "" },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true
    };
  },
  computed: {},
  watch: {
    isAddAppCfg() {
      this.showForm = this.isAddAppCfg;
    }
  },
  created() {},
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
      if (this.value == "" || this.value == "") {
        return;
      }
      let p = {
        value: this.form.value,
        name: this.form.name,
        description: this.form.description
      };
      this.addAppCfg(p);
    },
    async addAppCfg(model) {
      try {
        let rs = await this.Create([url.config.route,model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/AppConfig";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Setting/AppConfig";
    }
  }
};
</script>
<style>
</style>