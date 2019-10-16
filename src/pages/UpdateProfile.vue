<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 lg4>
        <v-card class="elevation-1 pa-3">
          <v-card-text>
            <div class="layout column align-center">
              <br />
              <div style="cursor:pointer" @click="$refs.inputUpload.click()">
                <v-avatar size="128">
                  <img :src="model.avatar" @error="errorImgUrl" />
                </v-avatar>
                <div style="text-align: center">
                  <v-icon>photo_camera</v-icon>
                </div>
              </div>
              <input
                v-show="false"
                ref="inputUpload"
                type="file"
                accept="image/*"
                @change="loadImageFile"
              />
            </div>
            <v-form ref="form" v-model="valid">
              <v-text-field
                append-icon="person"
                name="Username"
                label="Username"
                type="text"
                v-model="model.username"
                :rules="rules"
                v-on:keyup="validateForm"
              ></v-text-field>
              <v-text-field
                append-icon="face"
                name="displayName"
                label="DisplayName"
                type="text"
                v-model="model.displayName"
                :rules="rules"
                v-on:keyup="validateForm"
              ></v-text-field>
              <v-text-field
                append-icon="assignment_ind"
                name="fullName"
                label="FullName"
                type="text"
                v-model="model.fullName"
                :rules="rules"
                v-on:keyup="validateForm"
              ></v-text-field>
              <v-text-field
                append-icon="phone"
                name="phoneNumber"
                label="PhoneNumber"
                type="number"
                v-model="model.phoneNumber"
                :rules="rules"
                v-on:keyup="validateForm"
              ></v-text-field>
              <v-text-field
                append-icon="email"
                name="email"
                label="Email"
                type="email"
                v-model="model.email"
                :rules="emailRules"
                v-on:keyup="validateForm"
              ></v-text-field>
              <br />
              <v-btn block color="primary" :disabled="!valid" @click="validate" :loading="loading">Cập nhật</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      model: {
        username: "",
        displayName: "",
        fullName: "",
        avatar: "",
        phoneNumber: "",
        email: "",
        branchId: 0
      },
      valid: true,
      rules: [value => !!value || "Thông tin không được trống"],
      file: null,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  computed: {
    ...mapGetters(["profile"])
  },
  mounted() {
    this.fillProfile();
  },
  created() {
    this.getProfile();
  },
  watch: {
    profile() {
      this.fillProfile();
    }
  },
  methods: {
    ...mapActions(["UpdateProfile", "GetProfile", "UpdateInfomation"]),
    validateForm(e) {
      if (e.keyCode === 13) {
        this.validate();
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.updateInfomation();
      }
    },
    updateInfomation() {
      if (
        this.model.username == "" ||
        this.model.displayName == "" ||
        this.model.fullName == "" ||
        this.model.email == "" ||
        this.model.phoneNumber == ""
      ) {
        return;
      }
      this.loading = true;
      this.updateData();
    },
    async updateData() {
      const form = new FormData();
      form.append("image", this.file);
      form.append("branchId", 0);
      form.append("email", this.model.email);
      form.append("username", this.model.username);
      form.append("fullName", this.model.fullName);
      form.append("displayName", this.model.displayName);
      form.append("username", this.model.username);
      form.append("phoneNumber", this.model.phoneNumber);
      form.append("avatar", this.model.avatar);
      try {
        let rs = await this.UpdateProfile(form);
        if (rs) {
          window.getApp.showMessage("Cập nhật thành công", "success");
        }
        this.getProfile();
        this.loading = false;
      } catch (error) {
        window.getApp.showMessage(error, "success");
        this.loading = false;
      }
    },
    async getProfile() {
      try {
        let rs = await this.GetProfile();
        if (rs != "") {
          window.getApp.showMessage(rs, "error");
        } else {
          this.fillProfile();
        }
      } catch (error) {
        window.getApp.showMessage(error, "error");
      }
      this.loading = false;
    },
    fillProfile() {
      this.model.username = this.profile.username;
      this.model.displayName = this.profile.displayName;
      this.model.fullName = this.profile.fullName;
      this.model.avatar = this.profile.avatar;
      this.model.phoneNumber = this.profile.phoneNumber;
      this.model.email = this.profile.email;
      this.model.branchId = this.profile.branchId;
    },
    errorImgUrl(event) {
      event.target.src = "/static/logo.png";
    },
    loadImageFile(e) {
      const file = e.target.files[0];
      this.file = file;
      this.model.avatar = URL.createObjectURL(file);
    },
    isEmailValid: function() {
      return this.profile.email == ""
        ? ""
        : this.reg.test(this.profile.email)
        ? "has-success"
        : "has-error";
    }
  }
};
</script>
<style scoped lang="css">
</style>
