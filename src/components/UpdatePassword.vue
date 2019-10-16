<template>
  <div class="text-xs-center">
    <v-dialog :value="showForm" width="500" @input="close">
      <v-card>
        <v-card-title class="headline primary lighten-1 white--text" primary-title>Cập nhật mật khẩu</v-card-title>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-layout>
              <v-flex>
                <v-text-field
                  v-model="oldpassword"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Mật khẩu cũ"
                  hint="At least 6 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                  v-model="newPassword"
                  :append-icon="show2 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required]"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Mật khẩu mới"
                  hint="At least 6 characters"
                  counter
                  @click:append="show2 = !show2"
                ></v-text-field>
                <v-text-field
                  v-model="confirmNewPassword"
                  :append-icon="show3 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required,rules.match]"
                  :type="show3 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Xác nhận mật khẩu mới"
                  hint="At least 6 characters"
                  counter
                  @click:append="show3 = !show3"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>          
          <v-btn class="default" @click="close()">Đóng</v-btn>
          <v-btn class="primary" :disabled="!valid" @click="validate()">Cập nhật</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { async } from "q";
export default {
  name: "updatePassword",
  props: {
    isShow: false
  },
  data() {
    return {
      oldpassword: "",
      newPassword: "",
      confirmNewPassword: "",
      show1: false,
      show2: false,
      show3: false,
      rules: {
        required: value => !!value || "Bắt buộc nhập.",
        match: value =>
          value == this.newPassword || "Xác nhận mật khẩu không khớp."
      },
      showForm: this.isShow,
      valid: true
    };
  },
  computed: {},
  watch: {
    isShow() {
      this.showForm = this.isShow;
    }
  },
  created() {},
  methods: {
    ...mapActions(["UpdatePassword"]),
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
      if (this.newPassword !== this.confirmNewPassword) {
        return;
      }
      let p = {
        password: this.oldpassword,
        newPassword: this.newPassword
      };
      this.updatePass(p);
    },
    async updatePass(model) {
      let rs = await this.UpdatePassword(model);
      if (rs != "") {
        window.getApp.showMessage(rs, "error");
      } else {
        this.$emit("closeUpdatePassword", true);
      }
    },
    close() {
      this.$emit("closeUpdatePassword", false);
    }
  }
};
</script>
<style>
</style>