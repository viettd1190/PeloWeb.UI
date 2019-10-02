<template>
    <v-app id="login" class="primary">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4 lg4>
                        <v-card class="elevation-1 pa-3">
                            <v-card-text>
                                <div class="layout column align-center">
                                    <br>
                                    <img
                                        src="/static/logo.png"
                                        alt="Vue Material Admin"
                                    >
                                    <h2 class="flex my-4 primary--text"></h2>
                                </div>
                                <v-form>
                                    <v-text-field
                                        append-icon="person"
                                        name="login"
                                        label="Username"
                                        type="text"
                                        v-model="model.Username"
                                        :rules="rules"
                                        v-on:keyup="validateForm"
                                    ></v-text-field>
                                    <v-text-field
                                        append-icon="lock"
                                        name="password"
                                        label="Mật khẩu"
                                        id="password"
                                        type="password"
                                        v-model="model.Password"
                                        :rules="rules"
                                        v-on:keyup="validateForm"
                                    ></v-text-field>
                                    <br>
                                    <v-btn
                                        block
                                        color="primary"
                                        @click="login"
                                        :loading="loading">Đăng nhập</v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer height="auto" class="white pa-3 app--footer">
            <v-spacer/>
            <span
                class="caption">Copyright &copy; {{ new Date().getFullYear() }}<a class="text-bold-800 darken-2" href="http://vidia.vn" target="_blank"> VIDIA </a>, All rights reserved.</span>
            <v-spacer/>
        </v-footer>
    </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data: () => ({
    loading: false,
    model: {
      Username: '',
      Password: ''
    },
    rules: [value => !!value || "Thông tin không được trống"],
  }),
  methods: {
    ...mapActions(['loginByUsername']),
    validateForm(e) {
      if (e.keyCode === 13) {
        this.login();
      }
    },
    login () {
      if(this.model.Username==''||this.model.Password==''){
          return ;
      }
      this.loading = true;
      this.loginByUsername(this.model)
        .then(() => {
          this.loading = false;
          this.$router.push({ path: '/' });
        })
        .catch(_ => {
          this.loading = false;
          window.getApp.showMessage('error');
        });
    }
  }
};
</script>

<style scoped lang="css">
#login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
}
</style>
