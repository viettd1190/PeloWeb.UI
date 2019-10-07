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
            <v-form>
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
                type="text"
                v-model="model.phoneNumber"
                :rules="rules"
                v-on:keyup="validateForm"
              ></v-text-field>
              <v-text-field
                append-icon="email"
                name="email"
                label="Email"
                type="text"
                v-model="model.email"
                :rules="rules"
                v-on:keyup="validateForm"
              ></v-text-field>
              <br />
              <v-btn block color="primary" @click="updateInfomation" :loading="loading">Cập nhật</v-btn>
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
      rules: [value => !!value || "Thông tin không được trống"],
      file: null
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
        this.update();
      }
    },
    update() {
      if (
        this.model.username == "" ||
        this.model.displayName == "" ||
        this.model.fullName == "" ||
        this.model.email == "" ||
        this.model.phoneNumber
      ) {
        return;
      }
      this.loading = true;
      this.UpdateProfile(this.model)
        .then(() => {
          this.loading = false;
          window.getApp.showMessage("Cập nhật thành công", "success");
        })
        .catch(_ => {
          this.loading = false;
          window.getApp.showMessage(_, "error");
        });
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
        let rs = await this.UpdateInfomation(form);
        if (rs.data.isSuccess) {
          window.getApp.showMessage("Cập nhật thành công", "success");
        }
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
    }
  }
};
</script>
<style scoped lang="css">
</style>
