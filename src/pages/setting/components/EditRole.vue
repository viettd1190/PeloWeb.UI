<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật quyền</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md8 lg8>
              <v-text-field
                hide-details
                label="Tên quyền"
                v-model="form.name"
                class="ma-2"
                append-icon="search"
                v-on:keyup="validateForm"
                :rule="rules"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-card-actions>
              <v-btn class="default" @click="close()">
                <v-icon>undo</v-icon>Trở lại
              </v-btn>
              <v-btn class="primary" :disabled="!valid" @click="validate()">
                <v-icon>create</v-icon>Cập nhật
              </v-btn>
              <v-btn class="red white--text" @click="removeData()">
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
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { async } from "q";
import { messageResult } from "@/utils/index";
import TitlePage from "@/components/TitlePage";
import DialogConfirm from "@/components/DialogConfirm";
export default {
  components: { TitlePage, DialogConfirm },
  props: {},
  data() {
    return {
      form: {
        id: this.$route.params.id != "" ? parseInt(this.$route.params.id) : 0,
        name: "",
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true,
      isRemove: false
    };
  },
  computed: {
    ...mapGetters(["editRole"])
  },
  watch: {
    editRole() {
      if (this.editRole == null) {
        return;
      }
      this.form.id = this.editRole.id;
      this.form.name = this.editRole.name;
    },
  },
  mounted() {
    if (this.editRole == null) {
      this.getById(this.form.id);
      return;
    }
    this.form.id = this.editRole.id;
    this.form.name = this.editRole.name;
  },
  created() {this.getById(this.form.id)},
  methods: {
    ...mapActions([
      "UpdateRole",
      "DeleteRole",
      "GetRole"
    ]),
    ...mapMutations(["STATE_UPDATE_EDIT_ROLE"]),
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
      if (this.id == 0) {
        this.close();
      }
      if (this.form.name == "") {
        return;
      }
      let p = {
        id: this.form.id,
        name: this.form.name
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.UpdateRole(model);
        if (rs != "") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          this.STATE_UPDATE_EDIT_ROLE(null);
          window.location.href = "#/Setting/SystemRole";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      this.STATE_UPDATE_EDIT_ROLE(null);
      this.$destroy();      
      window.location.href = "#/Setting/SystemRole";
    },
    removeData() {
      this.isRemove = true;
    },
    async remove() {
      try {
        let rs = await this.DeleteRole(this.form.id);
        if (rs != "") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          this.$destroy();
          window.location.href = "#/Setting/SystemRole";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    async getById(id) {
      let rs = await this.GetRole(id);
      if (rs !== "") {
      } else {
        this.$destroy();
        this.STATE_UPDATE_EDIT_ROLE(null);
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