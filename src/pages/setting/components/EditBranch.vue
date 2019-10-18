<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật chi nhánh</title-page>
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
                :items="districts"
                item-text="name"
                item-value="id"
                v-model="district"
                label="Quận huyện"
                persistent-hint
                return-object
                v-on:change="changeDistrict"
              ></v-select>
              <v-select
                :items="wards"
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
                label="hotline"
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
import { messageResult } from "@/utils/index";
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
      selectProvinces: [],
      selectDistricts: [],
      selectWards: [],
      valid: true,
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" },
      ward: { id: 0, name: "", type: "" },
      isRemove: false
    };
  },
  computed: {
    ...mapGetters(["editBranch", "provinces", "districts", "wards"])
  },
  watch: {
    editBranch() {
      if (this.editBranch == null) {
        return;
      }
      this.syncSelect();
      this.form.id = this.editBranch.id;
      this.form.name = this.editBranch.name;
      this.form.address = this.editBranch.address;
      this.form.hotline = this.editBranch.hotline;
      this.ward.id = this.editBranch.wardId;
      this.province.id = this.editBranch.provinceId;
      this.district.id = this.editBranch.districtId;
    },
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
  mounted() {
    if (this.editBranch == null) {
      this.getById(this.form.id);
      this.syncSelect();
      return;
    }
    this.form.id = this.editBranch.id;
    this.form.name = this.editBranch.name;
    this.form.address = this.editBranch.address;
    this.form.hotline = this.editBranch.hotline;
    this.ward.id = this.editBranch.wardId;
    this.province.id = this.editBranch.provinceId;
    this.district.id = this.editBranch.districtId;
  },
  created() {},
  methods: {
    ...mapActions([
      "UpdateBranch",
      "DeleteBranch",
      "GetBranch",
      "GetProvinces",
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
        provinceId: this.province.id,
        districtId: this.district.id,
        wardId: this.ward.id
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.UpdateBranch(model);
        if (rs != "") {
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
      this.$destroy();
      window.location.href = "#/Setting/Branch";
    },
    removeData() {
      this.isRemove = true;
      //this.remove();
    },
    async remove() {
      try {
        let rs = await this.DeleteBranch(this.form.id);
        if (rs != "") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          this.$destroy();
          window.location.href = "#/Setting/Branch";
        }
      } catch (error) {
        window.getApp.showMessage(rs, messageResult.Error);
      }
    },
    syncSelect() {
      this.GetProvinces();
      this.GetDistricts({ ProvinceId: this.province.id });
      this.GetWards({
        ProvinceId: this.province.id,
        DistrictId: this.district.id
      });
    },
    changeProvince(e) {
      this.GetDistricts({ ProvinceId: e.id });
    },
    changeDistrict(e) {
      this.GetWards({ ProvinceId: this.province.id, DistrictId: e.id });
    },
    async getById(id) {
      let rs = await this.GetBranch(id);
      if (rs !== "") {
      } else {
        this.$destroy();
        window.location.href = "#/404";
      }
    },
    confirmDelete(flag) {
      if (flag) {        
        this.remove();
      }
      this.isRemove = false;
    }
  }
};
</script>
<style>
</style>