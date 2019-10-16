<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật tham số cấu hình</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md8 lg8>
              <v-text-field
                v-model="form.name"
                :rules="[rules.required]"
                type="text"
                name="input-10-1"
                label="Tên"
                counter
                @click:append="show1 = !show1"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="form.value"
                :rules="[rules.required]"
                type="text"
                name="input-10-1"
                label="Giá trị"
                counter
                @click:append="show2 = !show2"
              ></v-text-field>
              <v-textarea
                v-model="form.description"
                type="text"
                name="input-10-1"
                label="Ghi chú"
                counter
                @click:append="show3 = !show3"
              ></v-textarea>
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
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import { async } from "q";
import { messageResult } from "@/utils/index";
import TitlePage from "@/components/TitlePage";
export default {
  components: { TitlePage },
  props: {
  },
  data() {
    return {
      form: {
        id: this.$route.params.id != "" ? parseInt(this.$route.params.id) : 0,
        name: "",
        value: "",
        description: ""
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true
    };
  },
  computed: {
    ...mapGetters(["editAppConfig"])
  },
  watch: {
    editAppConfig() {
      if (this.editAppConfig == null) {
        return;
      }
      this.form.id = this.editAppConfig.id;
      this.form.name = this.editAppConfig.name;
      this.form.value = this.editAppConfig.value;
      this.form.description = this.editAppConfig.description;
    }
  },
  mounted() {
    if (this.editAppConfig == null) {
      this.getAppConfigById();
      return;
    }
    this.form.id = this.editAppConfig.id;
    this.form.name = this.editAppConfig.name;
    this.form.value = this.editAppConfig.value;
    this.form.description = this.editAppConfig.description;
  },
  created() {
  },
  methods: {
    ...mapActions(["UpdateAppConfig", "DeleteAppConfig", "GetAppConfig"]),
    ...mapActions(["STATE_UPDATE_EDIT_APPCONFIG"]),
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
      if (this.value == "" || this.value == "") {
        return;
      }
      let p = {
        id: this.form.id,
        value: this.form.value,
        name: this.form.name,
        description: this.form.description
      };
      this.updateAppCfg(p);
    },
    async updateAppCfg(model) {
      try {
        let rs = await this.UpdateAppConfig(model);
        if (rs != "") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          this.STATE_UPDATE_EDIT_APPCONFIG(null);
          window.location.href = "#/Setting/AppConfig";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      this.$destroy();
      this.STATE_UPDATE_EDIT_APPCONFIG(null);
      window.location.href = "#/Setting/AppConfig";
    },
    removeData() {
      this.remove();
    },
    async remove() {
      try {
        let rs = await this.DeleteAppConfig(this.form.id);
        if (rs != "") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          this.$destroy();
          this.STATE_UPDATE_EDIT_APPCONFIG(null);
          window.location.href = "#/Setting/AppConfig";
        }
      } catch (error) {
        window.getApp.showMessage(rs, messageResult.Error);
      }
    },
    async getAppConfigById() {
      let rs = await this.GetAppConfig(this.form.id);
      if (rs !== "") {
      } else {
        this.$destroy();
        this.STATE_UPDATE_EDIT_APPCONFIG(null);
        window.location.href = "#/404";
      }
    }
  }
};
</script>
<style>
</style>