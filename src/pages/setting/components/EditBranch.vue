<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật chi nhánh</title-page>
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
              ></v-text-field>
              <v-text-field
                v-model="form.address"
                :rules="[rules.required]"
                type="text"
                name="input-10-1"
                label="Địa chỉ"
                counter
                @click:append="show2 = !show2"
              ></v-text-field>
              <v-textarea
                v-model="form.hotline"
                type="text"
                name="input-10-1"
                label="hotline"
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
  props: {},
  data() {
    return {
      form: {
        id: this.$route.params.id != "" ? parseInt(this.$route.params.id) : 0,
        name: "",
        hotline: "",
        address: "",
        provinceId: null,
        districtId: null,
        wardId: null
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true
    };
  },
  computed: {
    ...mapGetters(["editBranch"])
  },
  watch: {
    editBranch() {
      if (this.editBranch == null) {
        return;
      }
      this.form.id = this.editBranch.id;
      this.form.name = this.editBranch.name;
      this.form.address = this.editBranch.address;
      this.form.hotline = this.editBranch.hotline;
    }
  },
  mounted() {
    if (this.editBranch == null) {
      return;
    }
    this.form.id = this.editBranch.id;
    this.form.name = this.editBranch.name;
    this.form.address = this.editBranch.address;
    this.form.hotline = this.editBranch.hotline;
  },
  created() {},
  methods: {
    ...mapActions(["UpdateBranch", "DeleteBranch", "GetBranch"]),
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
        address: this.form.address,
        name: this.form.name,
        hotline: this.form.hotline
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.UpdateBranch(model);
        if (rs != "") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/Branch";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      this.$destroy();
      window.location.href = "#/Setting/Branch";
    },
    removeData() {
      this.remove();
    },
    async remove() {
      try {
        let rs = await this.DeleteBranch(this.form.id);
        if (rs != "") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          this.$destroy();
          window.location.href = "#/Setting/Branch";
        }
      } catch (error) {
        window.getApp.showMessage(rs, messageResult.Error);
      }
    }
  }
};
</script>
<style>
</style>