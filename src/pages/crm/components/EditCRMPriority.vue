<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật trạng thái khẩn cấp</title-page>
      <v-container>
        <v-form ref="form" v-model="valid">
          <v-layout row justify-center>
            <v-text-field
              hide-details
              label="Tên"
              v-model="form.name"
              class="ma-2"
              v-on:keyup="validateForm"
              :rule="rules"
            ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-card-title primary-title>Màu sắc</v-card-title>
          </v-layout>
          <v-layout row justify-center style="padding-bottom:20px">
            <color-picker
              v-if="form.color != ''"
              :color="form.color"
              :sucker-hide="false"
              :sucker-canvas="suckerCanvas"
              :sucker-area="suckerArea"
              @changeColor="changecolor"
              @openSucker="openSucker"
            />
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
        </v-form>
      </v-container>
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
import ColorPicker from "@caohenghu/vue-colorpicker";

export default {
  components: { TitlePage, DialogConfirm, ColorPicker },
  props: {},
  data() {
    return {
      form: {
        id: this.$route.params.id != "" ? parseInt(this.$route.params.id) : 0,
        name: "",
        color: ""
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
        name: this.form.name,
        color: this.form.color
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.Update([url.crm_priority.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          window.location.href = "#/CRM/CRMPriority";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/CRM/CRMPriority";
    },
    removeData() {
      this.isRemove = true;
    },
    async remove() {
      try {
        let rs = await this.DeleteById([url.crm_priority.id, this.form.id]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          window.location.href = "#/CRM/CRMPriority";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    async getById(id) {
      try {
        let rs = await this.GetById([url.crm_priority.id, id]);
        if (typeof rs == "object") {
          this.form.id = rs.id;
          this.form.name = rs.name;
          this.form.color = rs.color;
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
    changecolor(color) {
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