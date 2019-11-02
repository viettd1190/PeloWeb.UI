<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Thêm sản phẩm</title-page>
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
        description: "",
        country_id: 0,
        manufacturer_id: 0,
        product_unit_id: 0,
        product_group_id: 0,
        product_status_id: 0,
        warranty_month: 0,
        sell_price: 0,
        import_price: 0
      },
      rules: [value => !!value || "Thông tin không được trống"],
      valid: true,
      productStatuses: [],
      productGroups: [],
      manufacturers: [],
      productUnits: []
    };
  },
  computed: { ...mapGetters(["countries"]) },
  watch: {},
  created() {
    this.syncSelect();
  },
  mounted() {},
  methods: {
    ...mapActions(["Create", "GetAll"]),
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
      if (this.form.name == "") {
        return;
      }
      let p = {
        name: this.form.name,
        description: this.form.description,
        country_id: this.form.country_id,
        manufacturer_id:this.form.manufacturer_id,
        product_unit_id: this.form.product_unit_id,
        product_group_id: this.form.product_group_id,
        product_status_id: this.form.product_status_id,
        warranty_month: this.form.warranty_month,
        sell_price: this.form.sell_price,
        import_price: this.form.import_price
      };
      this.add(p);
    },
    async add(model) {
      try {
        let rs = await this.Create([url.product.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.InsertSuccess,
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