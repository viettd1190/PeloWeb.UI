<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật xã phường</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md8 lg8>
              <v-select
                :items="selectProvinces"
                item-text="name"
                item-value="id"
                v-model="province"
                label="Tỉnh thành"
                persistent-hint
                return-object
                v-on:change="changeProvince"
              ></v-select>
              <v-select
                :items="selectDistricts"
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
        type: "",
        sortOrder: 0
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true,
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" },
      isRemove: false,
      selectProvinces: [],
      selectDistricts:[],
      isLoading: -1
    };
  },
  computed: {
    ...mapGetters(["provinces", "districts"])
  },
  watch: {
    provinces() {
      this.selectProvinces = this.provinces;
    },
    districts() {
      this.selectDistricts = this.districts;
    }
  },
  mounted() {},
  created() {
    this.getById(this.form.id);
  },
  methods: {
    ...mapActions(["Update", "DeleteById", "GetById", "GetDistricts"]),
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
      if (this.form.name == "") {
        return;
      }
      let p = {
        id: this.form.id,
        type: this.form.type,
        sortOrder: this.form.sortOrder,
        name: this.form.name,
        provinceId: this.province.id,
        districtId: this.district.id
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.Update([url.ward.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/Ward";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      this.$refs.form.reset();
      window.location.href = "#/Setting/Ward";
    },
    async remove() {
      try {
        let rs = await this.DeleteById([url.ward.id, this.form.id]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          window.location.href = "#/Setting/Ward";
        }
      } catch (error) {
        window.getApp.showMessage(rs, messageResult.Error);
      }
    },
    async getById(id) {
      try {
        if (this.isLoading < 0) {
          this.isLoading = 0;
        }
        if (this.isLoading == 0) {
          this.isLoading = 1;
          let response = await this.GetById([url.ward.id, id]);
          if (typeof response == "object") {
            this.form.name = response.name;
            this.form.type = response.type;
            this.form.sortOrder = response.sortOrder;
            this.province.id = response.provinceId;
            this.district.id = response.districtId;
            this.selectProvinces = this.provinces;
            this.changeProvince(response.provinceId);
            this.isLoading = -1;
          } else {
            window.location.href = "#/404";
            this.isLoading = -1;
          }
        }
      } catch (error) {
        window.location.href = "#/404";
        this.isLoading = -1;
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
    changeProvince(id) {
      this.selectDistricts = [];
      this.GetDistricts({ ProvinceId: id });
    }
  }
};
</script>
<style>
</style>