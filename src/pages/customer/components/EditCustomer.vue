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
                counter
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
                v-model="form.email"
                :rules="[rules.required, rules.validateEmail]"
                type="text"
                name="input-10-1"
                label="Email"
                counter
                :clearable="true"
              ></v-text-field>
              <v-text-field
                v-model="form.address"
                type="text"
                name="input-10-1"
                label="Địa chỉ"
                counter
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
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" },
      ward: { id: 0, name: "", type: "" },
      isRemove: false,
      selectProvinces: [],
      selectDistricts: [],
      selectWards: []
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
      "GetWards"
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
        email: this.form.email,
        description: this.form.description,
        provinceId: this.province.id,
        districtId: this.district.id,
        wardId: this.ward.id
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
          window.location.href = "#/Customer";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      this.$refs.form.reset();
      window.location.href = "#/Customer";
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
          window.location.href = "#/Customer";
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
          this.form.address = rs.address;
          this.form.email = rs.email;
          this.form.description = rs.description;
          this.province.id = rs.provinceId;
          this.district.id = rs.districtId;
          this.ward.id = rs.wardId;
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
    }
  }
};
</script>
<style>
</style>