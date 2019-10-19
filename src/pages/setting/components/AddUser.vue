<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm người dùng</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <div style="cursor:pointer" @click="$refs.inputUpload.click()">
            <v-avatar size="128">
              <img :src="form.avatar" @error="errorImgUrl" />
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
          <v-layout row justify-center>
            <v-flex xs12 sm12 md8 lg8>
              <v-text-field
                v-model="form.username"
                type="text"
                name="input-10-1"
                label="Tên đăng nhập"
                counter
                append-icon="person"
                :clearable="true"
                :rules="[rules.required]"
              ></v-text-field>
              <v-select
                :items="roles"
                item-text="name"
                item-value="id"
                v-model="role"
                label="Quyền"
                persistent-hint
                return-object
              ></v-select>
              <v-text-field
                v-model="form.password"
                :append-icon="show2 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.limitLength]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                label="Mật khẩu mới"
                hint="At least 6 characters"
                counter
                @click:append="show2 = !show2"
              ></v-text-field>
              <v-text-field
                v-model="form.confirmPassword"
                :append-icon="show3 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.match]"
                :type="show3 ? 'text' : 'password'"
                name="input-10-1"
                label="Xác nhận mật khẩu mới"
                hint="At least 6 characters"
                counter
                @click:append="show3 = !show3"
              ></v-text-field>
              <v-text-field
                v-model="form.full_name"
                type="text"
                name="input-10-1"
                label="Họ tên"
                counter
                append-icon="face"
                :clearable="true"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="form.display_name"
                type="text"
                name="input-10-1"
                label="Tên hiển thị"
                counter
                append-icon="assignment_ind"
                :clearable="true"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="form.phone_nummber"
                type="text"
                name="input-10-1"
                label="Số điện thoại"
                counter
                append-icon="phone"
                :clearable="true"
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                type="text"
                name="input-10-1"
                label="Email"
                counter
                :rules="emailRules"
                append-icon="mail"
                :clearable="true"
              ></v-text-field>
              <v-select
                :items="branchs"
                item-text="name"
                item-value="id"
                v-model="branch"
                label="Chi nhánh"
                persistent-hint
                return-object
              ></v-select>
            </v-flex>
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
import { messageResult } from "@/utils/index";
export default {
  components: { TitlePage },
  props: {},
  data() {
    return {
      form: {
        username: "",
        display_name: "",
        full_name: "",
        phone_nummber: "",
        email: "",
        avatar: "/static/avatar/no-avatar.jpg",
        password: ""
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập.",
        limitLength: value => {
          if (!(value == null || value == undefined || value == "")) {
            if (value.length < 6) {
              return "Mật khẩu nhập tối thiểu 6 ký tự";
            }
          }
          return false;
        },
        match: value =>
          value == this.form.password || "Xác nhận mật khẩu không khớp."
      },
      emailRules: [
        v => {
          if (v == null || !v.length > 0) {
            return false;
          } else {
            if (!/.+@.+\..+/.test(v)) {
              return "Vui lòng nhập đúng định dạng email (VD: test@gmail.com)";
            }
          }
          return false;
        }
      ],
      valid: true,
      role: { id: 0, name: "" },
      branch: { id: 0, name: "" },
      show1: false,
      show2: false,
      show3: false,
      file: null
    };
  },
  computed: {
    ...mapGetters(["branchs", "roles"])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["CreateUser"]),
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
      if (
        this.form.username == "" ||
        this.form.full_name == "" ||
        this.form.display_name == ""
      ) {
        return;
      }
      const p = new FormData();
      p.append("Avatar", this.file);
      p.append("BranchId", this.branch.id);
      p.append("RoleId", this.role.id);
      p.append("Email", this.form.email);
      p.append("Username", this.form.username);
      p.append("FullName", this.form.full_name);
      p.append("DisplayName", this.form.display_name);
      p.append("PhoneNumber", this.form.phone_nummber);
      p.append("Password", this.form.password);
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.CreateUser(model);
        if (rs != "") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/SystemUser";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Setting/SystemUser";
    },
    errorImgUrl(event) {
      event.target.src = "/static/logo.png";
    },
    loadImageFile(e) {
      const file = e.target.files[0];
      this.file = file;
      this.form.avatar = URL.createObjectURL(file);
    }
  }
};
</script>
<style>
</style>