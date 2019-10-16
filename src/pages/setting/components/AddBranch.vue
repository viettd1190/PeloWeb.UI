<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm chi nhánh</title-page>
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
              <v-text-field
                v-model="form.hotline"
                type="text"
                name="input-10-1"
                label="Hot line"
                counter
                append-icon="phone"
                @click:append="show3 = !show3"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-card-actions>
              <v-btn class="default" @click="close()">Trở lại</v-btn>
              <v-btn class="primary" :disabled="!valid" @click="validate()">Thêm mới</v-btn>
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
  props: {
  },
  data() {
    return {
      form: { name: "", hotline: "", address: "" },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true
    };
  },
  computed: {},
  watch: {
  },
  created() {},
  methods: {
    ...mapActions(["CreateBranch"]),
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
      if (this.value == "" || this.value == "") {
        return;
      }
      let p = {
        address: this.form.address,
        name: this.form.name,
        hotline: this.form.hotline
      };
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.CreateBranch(model);
        if (rs != "") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          this.$destroy();
          window.location.href = "#/Setting/Branch";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      this.$destroy();
      window.location.href = "#/Setting/Branch";
    }
  }
};
</script>
<style>
</style>