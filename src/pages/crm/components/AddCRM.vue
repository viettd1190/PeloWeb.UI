
<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm CRM</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <select2
              :options="provinces"
              :reduce="province => province.id"
              placeholder="Tỉnh thành"
              label="name"
              :clearable="false"
              v-model="selectedprovince"
              class="select2-form-control"
            ></select2>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
            <select2
              :options="selectDistricts"
              :reduce="district => district.id"
              placeholder="Quận huyện"
              label="name"
              :clearable="false"
              v-model="selecteddistrict"
              :loading="selectDistricts.length == 0 && selectedprovince != null"
              class="select2-form-control"
            ></select2>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <select2
                :options="selectWards"
                :reduce="ward => ward.id"
                placeholder="Xã phường"
                label="name"
                :clearable="false"
                v-model="selectedward"
                :loading="selectWards.length == 0 && selecteddistrict != null"
                class="select2-form-control"
              ></select2>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                v-model="form.name"
                :rules="[rules.required]"
                type="text"
                name="input-10-1"
                label="Tên"
                :clearable="true"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                v-model="form.address"
                type="text"
                name="input-10-1"
                label="Địa chỉ"
                :clearable="true"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                v-model="form.hotline"
                type="text"
                name="input-10-1"
                label="Hot line"
                :clearable="true"
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
import { messageResult, url } from "@/utils/index";
import PickColor from "@/components/PickColor";
export default {
  components: { TitlePage, PickColor },
  props: {},
  data() {
    return {
      form: {
        name: "",
        color: "#59c7f9",
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