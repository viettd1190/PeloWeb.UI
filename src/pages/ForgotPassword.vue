<template>
  <v-app id="forgotpassword" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <br />
                  <img src="/static/logo.png" alt="Vue Material Admin" />
                  <h2 class="flex my-4 primary--text"></h2>
                </div>
                <v-form v-show="!submitSuccess">
                  <v-text-field
                    name="login"
                    label="Username or email"
                    type="text"
                    v-model="model.username"
                    :rules="rules"
                    v-on:keyup="validateForm"
                  ></v-text-field>
                  <br />
                  <v-btn block color="primary" @click="submit" :loading="loading">Reset mật khẩu</v-btn>
                  <v-btn block @click="backtoLogin()">Quay về đăng nhập</v-btn>
                </v-form>
                <v-btn
                  v-show="submitSuccess"
                  block
                  color="primary"
                  @click="backtoLogin()"
                >Quay về đăng nhập</v-btn>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer height="auto" class="white pa-3 app--footer">
      <v-spacer />
      <span class="caption">
        Copyright &copy; {{ new Date().getFullYear() }}
        <a
          class="text-bold-800 darken-2"
          href="http://vidia.vn"
          target="_blank"
        >VIDIA</a>, All rights reserved.
      </span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      model: {
        username: ""
      },
      loading: false,
      rules: [value => !!value || "Thông tin không được trống"],
      submitSuccess: false
    };
  },
  methods: {
    ...mapActions(["ForgotPassword"]),
    validateForm(e) {
      if (e.keyCode === 13) {
        this.submit();
      }
    },
    submit() {
      if (this.model.sername == "") {
        return;
      }
      this.loading = true;
      this.ForgotPassword(this.model)
        .then(() => {
          this.loading = false;
          window.getApp.showMessage("Gửi thành công", "success");
          this.submitSuccess = true;
        })
        .catch(_ => {
          this.loading = false;
          window.getApp.showMessage(_, "error");
        });
    },
    backtoLogin() {
      window.location.href = "#/login";
    }
  },
  beforeDestroy() {
    this.submitSuccess=false;
    model.username='';
  }
};
</script>
<style scoped lang="css">
#forgotpassword {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>