
<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thông tin khách hàng</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                v-model="form.name"
                type="text"
                label="Tên khách hàng"
                :clearable="true"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs11 sm11 md9 lg9>
              <v-text-field
                v-model="form.phone"
                type="phone"
                label="Số điện thoại"
                :clearable="true"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 sm1 md1 lg1>
              <v-btn
                class="primary"
                :disabled="form.phone == ''"
                @click="findInfo()"
                >Tìm</v-btn
              >
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                v-model="form.address"
                type="text"
                label="Địa chỉ"
                :clearable="true"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                v-model="form.desciption"
                type="text"
                label="Ghi chú"
                :clearable="true"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-card-actions>
              <v-btn class="default" @click="close()">Trở lại</v-btn>
              <v-btn class="primary" :disabled="!valid" @click="validate()"
                >Tiếp tục thêm mới</v-btn
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
import { messageResult, url } from "@/utils/index";
export default {
  components: { TitlePage },
  props: {},
  data() {
    return {
      form: {
        name: "",
        color: "#59c7f9"
      },
      rules: [value => !!value || "Thông tin không được trống"],
      valid: true
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["Create"]),
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
      if (this.form.name == "" || this.color == "") {
        return;
      }
      let p = {
        name: this.form.name,
        color: this.color
      };
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.Create([url.crm.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          window.location.href = "#/CRM/Index";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/CRM/Index";
    },
    updateColor(color) {
      this.color = color;
    }
  }
};
</script>
<style>
</style>