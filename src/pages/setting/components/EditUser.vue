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
                :rules="[rules.required]"
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
                v-model="form.fullName"
                type="text"
                name="input-10-1"
                label="Họ tên"
                counter
                append-icon="face"
                :clearable="true"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="form.displayName"
                type="text"
                name="input-10-1"
                label="Tên hiển thị"
                counter
                append-icon="assignment_ind"
                :clearable="true"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="form.phone"
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
        id: this.$route.params.id != "" ? parseInt(this.$route.params.id) : 0,
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
  created() {
    this.getById(this.form.id);
  },
  mounted() {
    if (this.editUser == null) {
      this.getById(this.form.id);
      return;
    }
    this.form.username = this.editUser.username;
    this.form.display_name = this.editUser.display_name;
    this.form.full_name = this.editUser.full_name;
    this.form.phone_nummber = this.editUser.phone_nummber;
    this.form.email = this.editUser.email;
    this.branch.id = this.editUser.branchId;
    this.role.id = this.editUser.roleId;
    this.form.avatar = process.env.URL_IMAGE + this.editUser.avatar;
  },
  methods: {
    ...mapActions(["CreateUser", "GetUser"]),
    ...mapMutations(["STATE_EDIT_USER"]),
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
        this.form.display_name
      ) {
        return;
      }
      const p = new FormData();
      form.append("image", this.file);
      form.append("branchid", this.branch.id);
      form.append("roleid", this.role.id);
      form.append("email", this.form.email);
      form.append("username", this.form.username);
      form.append("full_name", this.form.full_name);
      form.append("display_name", this.form.display_name);
      form.append("phone_number", this.form.phone_nummber);
      form.append("id", this.form.id);
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.CreateUser(model);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          this.STATE_EDIT_USER(null);
          window.location.href = "#/Setting/SystemUser";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      this.STATE_EDIT_USER(null);
      window.location.href = "#/Setting/SystemUser";
    },
    errorImgUrl(event) {
      event.target.src = "/static/avatar/no-avatar.jpg";
    },
    loadImageFile(e) {
      const file = e.target.files[0];
      this.file = file;
      this.form.avatar = URL.createObjectURL(file);
    },
    async getById(id) {
      try {
        let rs = await this.GetUser(id);
        if (rs !== "") {
          this.form.username = rs.username;
          this.form.display_name = rs.displayName;
          this.form.full_name = rs.fullName;
          this.form.phone_nummber = rs.phoneNumber;
          this.form.email = rs.email;
          this.branch.id = rs.branchId;
          this.role.id = rs.roleId;
          this.form.avatar = process.env.URL_IMAGE + rs.avatar;
        } else {
          window.location.href = "#/404";
        }
      } catch (error) {
        window.location.href = "#/404";
      }
    }
  }
};
</script>
<style>
</style>