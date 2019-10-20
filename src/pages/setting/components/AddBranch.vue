<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm chi nhánh</title-page>
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
                :error-messages="errors.collect('type')"
                v-validate="'required'"
                data-vv-name="type"
                required
              ></v-select>
              <v-select
                :items="selectDistricts"
                item-text="name"
                item-value="id"
                v-model="district"
                label="Quận huyện"
                persistent-hint
                return-object
                v-on:change="changeDistrict"
              ></v-select>
              <v-select
                :items="selectWards"
                item-text="name"
                item-value="id"
                v-model="ward"
                label="Xã phường"
                persistent-hint
                return-object
              ></v-select>
              <v-text-field
                v-model="form.name"
                :rules="[rules.required]"
                type="text"
                name="input-10-1"
                label="Tên"
                counter
                @click:append="show1 = !show1"
                :clearable="true"
              ></v-text-field>
              <v-text-field
                v-model="form.address"
                type="text"
                name="input-10-1"
                label="Địa chỉ"
                counter
                @click:append="show2 = !show2"
                :clearable="true"
              ></v-text-field>
              <v-text-field
                v-model="form.hotline"
                type="text"
                name="input-10-1"
                label="Hot line"
                counter
                append-icon="phone"
                @click:append="show3 = !show3"
                :clearable="true"
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
        hotline: "",
        address: "",
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true,
      selectProvinces: [],
      selectDistricts: [],
      selectWards: [],
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" },
      ward: { id: 0, name: "", type: "" }
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
        this.province.id == 0
      ) {
        return;
      }
      let p = {
        address: this.form.address,
        name: this.form.name,
        hotline: this.form.hotline,
        provinceId: this.province.id,
        districtId: this.district.id,
        wardId: this.ward.id
      };
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.Create([url.branch.route,model]);
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
    changeProvince(e) {
      this.GetDistricts({ ProvinceId: e.id });      
    },
    changeDistrict(e) {
      this.GetWards({ ProvinceId: this.province.id, DistrictId: e.id });
    }
  }
};
</script>
<style>
</style>