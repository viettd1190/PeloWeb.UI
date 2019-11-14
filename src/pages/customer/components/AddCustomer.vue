<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm khách hàng</title-page>
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
                :clearable="true"
              ></v-text-field>
              <v-text-field
                v-model="form.phone"
                :rules="[rules.required]"
                type="text"
                name="input-10-1"
                label="Điện thoại"
                counter
                :clearable="true"
              ></v-text-field>
              <v-text-field
                v-model="form.phone2"
                type="text"
                name="input-10-1"
                label="Điện thoại 2"
                counter
                :clearable="true"
              ></v-text-field>
              <v-text-field
                v-model="form.phone3"
                type="text"
                name="input-10-1"
                label="Điện thoại 3"
                counter
                :clearable="true"
              ></v-text-field>
              <v-text-field
                v-model="form.email"
                :rules="[rules.required, rules.validateEmail]"
                type="text"
                name="input-10-1"
                label="Email"
                :clearable="true"
              ></v-text-field>
              <v-select
                :items="selectCustomerGroups"
                item-text="name"
                item-value="id"
                v-model="customer_group"
                label="Nhóm khách hàng"
                persistent-hint
                return-object
                required
              ></v-select>
              <v-text-field
                v-model="form.address"
                type="text"
                name="input-10-1"
                label="Địa chỉ"
                :clearable="true"
              ></v-text-field>
              <v-select
                :items="provinces"
                item-text="name"
                item-value="id"
                v-model="province"
                label="Tỉnh thành"
                persistent-hint
                return-object
                v-on:change="changeProvince"
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
              <v-textarea
                v-model="form.description"
                type="text"
                name="input-10-1"
                label="Ghi chú"
                counter
              ></v-textarea>
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
        phone: "",
        phone2: "",
        phone3: "",
        description: "",
        address: "",
        email: ""
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập.",
        validateEmail: v => {
          if (v == null || !v.length > 0) {
            return false;
          } else {
            if (!/.+@.+\..+/.test(v)) {
              return "Vui lòng nhập đúng định dạng email (VD: test@gmail.com)";
            }
          }
          return false;
        }
      },
      valid: true,
      selectProvinces: [],
      selectDistricts: [],
      selectWards: [],
      selectCustomerGroups: [],
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" },
      ward: { id: 0, name: "", type: "" },
      customer_group: { id: 0, name: "" }
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
    ...mapActions(["Create", "GetDistricts", "GetWards", "GetAll"]),
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
        address: this.form.address,
        name: this.form.name,
        phone: this.form.phone,
        phone_2: this.form.phone2,
        phone_3: this.form.phone3,
        email: this.form.email,
        description: this.form.description,
        province_id: this.province.id,
        district_id: this.district.id,
        ward_id: this.ward.id,
        customer_group_id: this.customer_group.id
      };
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.Create([url.customer.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
            messageResult.Success
          );
          window.location.href = "#/Customer/Index";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Customer/Index";
    },
    syncSelect() {
      this.GetDistricts(0);
      this.GetWards(0);
      this.getAllCustomerGroup();
    },
    changeProvince(e) {
      if (e == undefined) {
        this.province = { id: 0, name: "" };
      }
      this.GetDistricts({ ProvinceId: this.province.id });
    },
    changeDistrict(e) {
      if (e == undefined) {
        this.district = { id: 0, name: "" };
      }
      this.GetWards({
        ProvinceId: this.province.id,
        DistrictId: this.district.id
      });
    },
    async getAllCustomerGroup() {
      try {
        let rs = await this.GetAll(url.customer_group.all);
        if (typeof rs == "object") {
          this.selectCustomerGroups = rs;
        }
      } catch (error) {}
    }
  }
};
</script>
<style>
</style>