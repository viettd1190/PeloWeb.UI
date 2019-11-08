<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật mô tả bảo hành</title-page>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout row justify-center>
            <v-flex xs12 sm12 md10 lg10>
              <v-text-field
                hide-details
                label="Tên"
                v-model="form.name"
                class="ma-2"
                v-on:keyup="validateForm"
                :rule="rules"
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
        name: ""
      },
      rules: {
        required: value => !!value || "Bắt buộc nhập."
      },
      valid: true,
      isRemove: false,
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false
    };
  },
  computed: {
    ...mapGetters([])
  },
  watch: {},
  mounted() {},
  created() {
    this.getById(this.form.id);
  },
  methods: {
    ...mapActions(["Update", "DeleteById", "GetById"]),
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
        name: this.form.name
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.Update([url.warranty_description.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          window.location.href = "#/Warranty/WarrantyDescription";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Warranty/WarrantyDescription";
    },
    removeData() {
      this.isRemove = true;
    },
    async remove() {
      try {
        let rs = await this.DeleteById([
          url.warranty_description.id,
          this.form.id
        ]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          window.location.href = "#/Warranty/WarrantyDescription";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    async getById(id) {
      try {
        let rs = await this.GetById([url.warranty_description.id, id]);
        if (typeof rs == "object") {
          this.form.id = rs.id;
          this.form.name = rs.name;
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
    updateColor(color) {
      this.form.color = color;
    },
    changeColor(color) {
      this.form.color = this.rGBToHex(color.rgba);
    },
    rGBToHex(rgba) {
      let r = rgba.r.toString(16);
      let g = rgba.g.toString(16);
      let b = rgba.b.toString(16);
      let a = Math.round(rgba.a * 255).toString(16);

      if (r.length == 1) r = "0" + r;
      if (g.length == 1) g = "0" + g;
      if (b.length == 1) b = "0" + b;
      if (a.length == 1) a = "0" + a;

      return "#" + r + g + b + a;
    },
    openSucker(isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    }
  }
};
</script>
<style>
</style>