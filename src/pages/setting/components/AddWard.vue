<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm xã phường</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md8 lg8>
              <v-select
                :items="provinces"
                item-text="name"
                item-value="id"
                v-model="province"
                label="Tỉnh thành"
                persistent-hint
                return-object
                v-on:change="changeProvince"
              ></v-select>
              <v-select
                :items="selectDistrict"
                item-text="name"
                item-value="id"
                v-model="district"
                label="Quận huyện"
                persistent-hint
                return-object
              ></v-select>
              <v-text-field
                v-model="form.name"
                :rules="[rules.required]"
                type="text"
                label="Tên"
                counter
                :clearable="true"
                v-on:keyup="validateForm"
              ></v-text-field>
              <v-text-field
                v-model="form.type"
                type="text"
                label="Loại"
                counter
                :clearable="true"
                v-on:keyup="validateForm"
              ></v-text-field>
              <v-text-field
                v-model="form.sortOrder"
                type="number"
                label="Thứ tự"
                v-on:keyup="validateForm"
              ></v-text-field>
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
import { messageResult, url } from "@/utils/index";
export default {
  components: { TitlePage },
  props: {},
  data() {
    return {
      form: {
        name: "",
        type: "",
        sortOrder: 0
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true,
      selectDistrict: [],
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" }
    };
  },
  computed: {
    ...mapGetters(["provinces", "districts"])
  },
  watch: {
    districts() {
      this.selectDistrict = this.districts;
    }
  },
  created() {
    this.syncSelect();
  },
  mounted() {},
  methods: {
    ...mapActions(["Create", "GetDistricts"]),
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
      if (this.form.name == "" || this.province.id == 0) {
        return;
      }
      let p = {
        type: this.form.type,
        name: this.form.name,
        sortOrder: this.form.sortOrder,
        provinceId: this.province.id,
        districtId: this.district.id
      };
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.Create([url.ward.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/Ward";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Setting/Ward";
    },
    syncSelect() {
      this.changeProvince(this.province);
    },
    changeProvince(e) {
      this.selectDistrict = [];
      this.GetDistricts({ ProvinceId: e.id });
    }
  }
};
</script>
<style>
</style>