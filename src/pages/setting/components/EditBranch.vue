<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật chi nhánh</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md8 lg8>
              <select2
                :options="provinces"
                :reduce="province => province.id"
                placeholder="Tỉnh thành"
                label="name"
                :clearable="false"
                v-model="selectedprovince"
              ></select2>
              <select2
                :options="selectDistricts"
                :reduce="district => district.id"
                placeholder="Quận huyện"
                label="name"
                :clearable="false"
                v-model="selecteddistrict"
                :loading="
                  selectDistricts.length == 0 && selectedprovince != null
                "
              ></select2>
              <select2
                :options="selectWards"
                :reduce="ward => ward.id"
                placeholder="Xã phường"
                label="name"
                :clearable="false"
                v-model="selectedward"
                :loading="selectWards.length == 0 && selecteddistrict != null"
              ></select2>
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
                label="Hotline"
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
        hotline: "",
        address: ""
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true,
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" },
      ward: { id: 0, name: "", type: "" },
      isRemove: false,
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
        hotline: this.form.hotline,
        provinceId: this.selectedprovince,
        districtId: this.selecteddistrict,
        wardId: this.selectedward
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.Update([url.branch.route, model]);
        if (typeof rs == "string") {
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
      this.$refs.form.reset();
      window.location.href = "#/Setting/Branch";
    },
    async remove() {
      try {
        let rs = await this.DeleteById([url.branch.id, this.form.id]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/Branch";
        }
      } catch (error) {
        window.getApp.showMessage(rs, messageResult.Error);
      }
    },
    syncSelect() {
      // this.GetDistricts({ ProvinceId: this.selectedprovince });
      // this.GetWards({
      //   ProvinceId: this.province.id,
      //   DistrictId: this.district.id
      // });
    },
    changeProvince() {
      this.GetDistricts({ ProvinceId: this.selectedprovince});
      this.selectWards = [];
      //this.GetWards({ ProvinceId: this.province.id, DistrictId: 0 });
    },
    changeDistrict() {
      this.GetWards({
        ProvinceId: this.selectedprovince,
        DistrictId: this.selecteddistrict
      });
    },
    async getById(id) {
      try {
        let rs = await this.GetById([url.branch.id, id]);
        if (typeof rs == "object") {
          this.form.name = rs.name;
          this.form.address = rs.address;
          this.form.hotline = rs.hotline;
          this.selectedward = rs.wardId;
          this.selectedprovince = rs.provinceId;
          this.selecteddistrict = rs.districtId;
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