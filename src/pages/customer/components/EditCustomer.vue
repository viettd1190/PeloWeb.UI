<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật khách hàng</title-page>
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
                v-model="form.profit"
                type="number"
                name="input-10-1"
                label="Lợi nhuận"
              ></v-text-field>
              <v-text-field
                v-model="form.profit_update"
                type="number"
                name="input-10-1"
                label="Lợi nhuận cập nhật"
              ></v-text-field>
              <v-text-field
                v-model="form.address"
                type="text"
                name="input-10-1"
                label="Địa chỉ"
                :clearable="true"
              ></v-text-field>
              <v-select
                :items="selectProvinces"
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
              <v-btn class="default" @click="close()">
                <v-icon>undo</v-icon>Trở lại
              </v-btn>
              <v-btn class="success" @click="updateProfit_value()">
                <v-icon>autorenew</v-icon>Cập nhật lợi nhuận
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
import { messageResult, url } from "@/utils/index";
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
        phone: "",
        phone2: "",
        phone3: "",
        description: "",
        address: "",
        email: "",
        profit: 0,
        profit_update: 0
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
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" },
      ward: { id: 0, name: "", type: "" },
      customer_group: { id: 0, name: "" },
      isRemove: false,
      selectProvinces: [],
      selectDistricts: [],
      selectWards: [],
      selectCustomerGroups: []
    };
  },
  computed: {
    ...mapGetters(["provinces", "districts", "wards"])
  },
  watch: {
    provinces() {
      this.selectProvinces = this.provinces;
    },
    districts() {
      this.selectDistricts = this.districts;
    },
    wards() {
      this.selectWards = this.wards;
    }
  },
  mounted() {},
  created() {
    this.getById(this.form.id);
  },
  methods: {
    ...mapActions([
      "Update",
      "DeleteById",
      "GetById",
      "GetDistricts",
      "GetWards",
      "GetAll"
    ]),
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
      if (this.form.name == "" || this.province.id == 0) {
        return;
      }
      let p = {
        id: this.form.id,
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
        profit_update: this.form.profit_update,
        customer_group_id: this.customer_group.id
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.Update([url.customer.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          window.location.href = "#/Customer/Index";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      this.$refs.form.reset();
      window.location.href = "#/Customer/Index";
    },
    async remove() {
      try {
        let rs = await this.DeleteById([url.customer.id, this.form.id]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          window.location.href = "#/Customer/Index";
        }
      } catch (error) {
        window.getApp.showMessage(rs, messageResult.Error);
      }
    },
    syncSelect() {
      this.GetDistricts({ ProvinceId: this.province.id });
      this.GetWards({
        ProvinceId: this.province.id,
        DistrictId: this.district.id
      });
      this.getAllCustomerGroup();
    },
    changeProvince(e) {
      if (e == undefined) {
        this.province = { id: 0, name: "" };
      }
      this.GetDistricts({ ProvinceId: this.province.id });
      this.selectWards = [];
      this.GetWards({ ProvinceId: this.province.id, DistrictId: 0 });
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
    async getById(id) {
      try {
        let rs = await this.GetById([url.customer.id, id]);
        if (typeof rs == "object") {
          this.form.name = rs.name;
          this.form.phone = rs.phone;
          this.form.phone2 = rs.phone_2;
          this.form.phone3 = rs.phone_3;
          this.form.address = rs.address;
          this.form.email = rs.email;
          this.form.description = rs.description;
          this.province.id = rs.province_id;
          this.district.id = rs.district_id;
          this.ward.id = rs.ward_id;
          this.customer_group.id = rs.customer_group_id;
          this.form.profit = rs.profit;
          this.form.profit_update = rs.profit_update;
          this.selectProvinces = this.provinces;
          this.syncSelect();
        } else {
          window.location.href = "#/404";
        }
      } catch (error) {
        window.location.href = "#/404";
      }
    },
    confirmDelete(flag) {
      if (flag) {
        this.remove();
      }
      this.isRemove = false;
    },
    removeData() {
      this.isRemove = true;
    },
    updateProfit_value() {
      this.updateProfit();
    },
    async getAllCustomerGroup() {
      try {
        let rs = await this.GetAll(url.customer_group.all);
        if (typeof rs == "object") {
          this.selectCustomerGroups = rs;
        }
      } catch (error) {}
    },
    async getAllCustomerGroup() {
      try {
        let rs = await this.GetAll(url.customer_group.all);
        if (typeof rs == "object") {
          this.selectCustomerGroups = rs;
        }
      } catch (error) {}
    },
    async updateProfit() {
      let model = {
        id: this.form.id
      };
      try {
        let rs = await this.Update([url.customer.profit, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          this.getById();
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    }
  }
};
</script>
<style>
</style>