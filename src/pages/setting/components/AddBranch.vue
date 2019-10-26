<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm chi nhánh</title-page>
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
export default {
  components: { TitlePage },
  props: {},
  data() {
    return {
      form: {
        name: "",
        hotline: "",
        address: ""
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true,
      selectProvinces: [],
      selectDistricts: [],
      selectWards: [],
      selectedprovince: null,
      selecteddistrict: null,
      selectedward: null
    };
  },
  computed: {
    ...mapGetters(["provinces", "districts", "wards"])
  },
  watch: {
    districts() {
      this.selectDistricts = this.districts;
    },
    wards() {
      this.selectWards = this.wards;
    },
    selectedprovince() {
      this.changeProvince();
    },
    selecteddistrict() {
      this.changeDistrict();
    }
  },
  created() {},
  mounted() {
    this.syncSelect();
  },
  methods: {
    ...mapActions(["Create", "GetProvinceAll", "GetDistricts", "GetWards"]),
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
        this.form.name == "" ||
        this.selectedprovince == null ||
        this.selecteddistrict == null
      ) {
        return;
      }
      let p = {
        address: this.form.address,
        name: this.form.name,
        hotline: this.form.hotline,
        provinceId: this.selectedprovince,
        districtId: this.selecteddistrict,
        wardId: this.selectedward
      };
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.Create([url.branch.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/Branch";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Setting/Branch";
    },
    syncSelect() {
      this.GetDistricts(0);
      this.GetWards(0);
    },
    changeProvince() {
      this.GetDistricts({ ProvinceId: this.selectedprovince });
      this.selectWards = [];
    },
    changeDistrict() {
      this.GetWards({
        ProvinceId: this.selectedprovince,
        DistrictId: this.selecteddistrict
      });
    }
  }
};
</script>
<style>
</style>