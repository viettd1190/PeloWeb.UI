<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật người dùng</title-page>
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
                disabled                
              ></v-text-field>
              <v-select
                :items="selectRoles"
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
                :rules="[rules.match]"
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
                v-model="form.phoneNumber"
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
                :items="selectBranchs"
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
                >Cập nhật</v-btn
              ><v-btn class="red white--text" @click="removeData()">
                <v-icon>close</v-icon>Xóa
              </v-btn>
            </v-card-actions>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
    <dialog-confirm v-if="isRemove" @comfirm="confirmDelete"></dialog-confirm>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { async } from "q";
import TitlePage from "@/components/TitlePage";
import { messageResult, url } from "@/utils/index";
import DialogConfirm from "@/components/DialogConfirm";
export default {
  components: { TitlePage, DialogConfirm },
  props: {},
  data() {
    return {
      form: {
        id: this.$route.params.id != "" ? parseInt(this.$route.params.id) : 0,
        username: "",
        displayName: "",
        fullName: "",
        phonenummber: "",
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
        match: value => {
          if (this.form.password.length == 0) {
            return false;
          }
          if (value != this.form.password) {
            return "Xác nhận mật khẩu không khớp.";
          }
          return false;
        }
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
      selectBranchs: [],
      selectRoles: [],
      show1: false,
      show2: false,
      show3: false,
      file: null,
      isRemove: false
    };
  },
  computed: {
    ...mapGetters(["branchs", "roles"])
  },
  watch: {
    branchs() {
      this.selectBranchs = this.branchs;
    },
    roles() {
      this.selectRoles = this.roles;
    }
  },
  created() {
    this.getById(this.form.id);
  },
  mounted() {},
  methods: {
    ...mapActions(["GetById", "DeleteById", "Update"]),
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
        this.form.fullName == "" ||
        this.form.displayName == ""
      ) {
        return;
      }
      const p = new FormData();
      p.append("Avatar", this.file);
      p.append("BranchId", this.branch.id);
      p.append("RoleId", this.role.id);
      p.append("Email", this.form.email);
      p.append("Username", this.form.username);
      p.append("FullName", this.form.fullName);
      p.append("DisplayName", this.form.displayName);
      p.append("PhoneNumber", this.form.phoneNumber);
      p.append("Password", this.form.password);
      p.append("id", this.form.id);
      this.update(p);
    },
    close() {
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
    removeData() {
      this.isRemove = true;
    },
    async update(model) {
      try {
        let rs = await this.Update([url.user.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/SystemUser";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    async remove() {
      try {
        let rs = await this.DeleteById([url.user.id, this.form.id]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/SystemUser";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    async getById(id) {
      try {
        let rs = await this.GetById([url.user.id, id]);
        if (typeof rs != "string") {
          this.form.username = rs.username;
          this.form.displayName = rs.displayName;
          this.form.fullName = rs.fullName;
          this.form.phoneNumber = rs.phoneNumber;
          this.form.email = rs.email;
          this.branch.id = rs.branchId;
          this.role.id = rs.roleId;
          this.form.avatar =rs.avatar!=null? process.env.URL_IMAGE + rs.avatar:"";
          this.selectBranchs = this.branchs;
          this.selectRoles = this.roles;
        } else {
          window.location.href = "#/404";
        }
      } catch (error) {
        window.location.href = "#/404";
      }
    },
    confirmDelete(flag) {
      if (flag) {
        this.remove();
      }
      this.isRemove = false;
    }
  }
};
</script>
<style>
</style>