<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật sản phẩm</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                hide-details
                label="Tên"
                v-model="form.name"
                v-on:keyup="validateForm"
                :rule="rules"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                hide-details
                label="Giá nhập"
                type="number"
                v-model="form.import_price"
                v-on:keyup="validateForm"
                suffix="VNĐ"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                hide-details
                label="Giá bán lẻ"
                type="number"
                v-model="form.sell_price"
                v-on:keyup="validateForm"
                suffix="VNĐ"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                hide-details
                label="Số lượng tồn kho nhiều nhất"
                type="number"
                v-model="form.max_count"
                v-on:keyup="validateForm"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                hide-details
                label="Số lượng tồn kho ít nhất"
                type="number"
                v-model="form.min_count"
                v-on:keyup="validateForm"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <select2
                :options="manufacturers"
                :reduce="manufacturer => manufacturer.id"
                placeholder="Thương hiệu"
                label="name"
                v-model="form.manufacturer_id"
                class="select2-form-control"
              ></select2>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <select2
                :options="productGroups"
                :reduce="productGroup => productGroup.id"
                placeholder="Nhóm sản phẩm"
                label="name"
                v-model="form.product_group_id"
                class="select2-form-control"
              ></select2>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <select2
                :options="productUnits"
                :reduce="productUnit => productUnit.id"
                placeholder="Đơn vị tính"
                label="name"
                v-model="form.product_unit_id"
                class="select2-form-control"
              ></select2>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <select2
                :options="productStatuses"
                :reduce="productStatus => productStatus.id"
                placeholder="Trạng thái sản phẩm"
                label="name"
                v-model="form.product_status_id"
                class="select2-form-control"
              ></select2>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <select2
                :options="countries"
                :reduce="country => country.id"
                placeholder="Xuất xứ"
                label="name"
                v-model="form.country_id"
                class="select2-form-control"
              ></select2>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                hide-details
                label="Thời hạn bảo hành"
                type="number"
                v-model="form.warranty_month"
                v-on:keyup="validateForm"
                suffix="tháng"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-textarea
                v-model="form.description"
                type="text"
                name="input-10-1"
                label="Ghi chú"
              ></v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row justify-center>
            <v-card-actions>
              <v-btn class="default" @click="close()">Trở lại</v-btn>
              <v-btn class="primary" :disabled="!valid" @click="validate()"
                >Cập nhật</v-btn
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
        description: "",
        country_id: 0,
        manufacturer_id: 0,
        product_unit_id: 0,
        product_group_id: 0,
        product_status_id: 0,
        warranty_month: 0,
        sell_price: 0,
        import_price: 0,
        min_count: 0,
        max_count: 0
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true,
      isRemove: false,
      selectCountries: [],
      productStatuses: [],
      productGroups: [],
      manufacturers: [],
      productUnits: []
    };
  },
  computed: {
    ...mapGetters(["countries"])
  },
  watch: {},
  mounted() {},
  created() {
    this.getById(this.form.id);
  },
  methods: {
    ...mapActions(["Update", "DeleteById", "GetById", "GetAll"]),
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
        name: this.form.name,
        name: this.form.name,
        description: this.form.description,
        country_id: this.form.country_id,
        manufacturer_id: this.form.manufacturer_id,
        product_unit_id: this.form.product_unit_id,
        product_group_id: this.form.product_group_id,
        product_status_id: this.form.product_status_id,
        warranty_month: this.form.warranty_month,
        sell_price: this.form.sell_price,
        import_price: this.form.import_price,
        min_count: this.form.min_count,
        max_count: this.form.max_count
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.Update([url.product.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          window.location.href = "#/Product";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Product";
    },
    removeData() {
      this.isRemove = true;
    },
    async remove() {
      try {
        let rs = await this.DeleteById([url.product.id, this.form.id]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          window.location.href = "#/Product/Index";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    async getById(id) {
      try {
        let rs = await this.GetById([url.product.id, id]);
        if (rs !== "") {
          this.form.id = rs.id;
          this.form.name = rs.name;
          this.form.description = rs.description;
          this.form.manufacturer_id = rs.manufacturer_id;
          this.form.product_unit_id = rs.product_unit_id;
          this.form.product_group_id = rs.product_group_id;
          this.form.product_status_id = rs.product_status_id;
          this.form.country_id = rs.country_id;
          this.form.warranty_month = rs.warranty_month;
          this.form.sell_price = rs.sell_price;
          this.form.import_price = rs.import_price;
          this.form.max_count = rs.max_count;
          this.form.min_count = rs.min_count;
          this.selectCountries = this.countries;
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
    async syncSelect() {
      this.getProductGroup();
      this.getProductUnit();
      this.getManufacturer();
      this.getProductStatus();
    },
    async getProductGroup() {
      try {
        let rs = await this.GetAll(url.productGroup.all);
        if (typeof rs == "object") {
          this.productGroups = rs;
        }
      } catch (error) {
        this.productGroups = [];
      }
    },
    async getProductUnit() {
      try {
        let rs = await this.GetAll(url.product_unit.all);
        if (typeof rs == "object") {
          this.productUnits = rs;
        }
      } catch (error) {
        this.productUnits = [];
      }
    },
    async getManufacturer() {
      try {
        let rs = await this.GetAll(url.manufacturer.all);
        if (typeof rs == "object") {
          this.manufacturers = rs;
        }
      } catch (error) {
        this.manufacturers = [];
      }
    },
    async getProductStatus() {
      try {
        let rs = await this.GetAll(url.product_status.all);
        if (typeof rs == "object") {
          this.productStatuses = rs;
        }
      } catch (error) {
        this.productStatuses = [];
      }
    }
  }
};
</script>
<style>
</style>