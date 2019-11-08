<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật trạng thái biên nhận</title-page>
      <v-container>
        <v-form ref="form" v-model="valid">
          <v-layout row justify-center>
            <v-text-field
              hide-details
              label="Tên"
              v-model="form.name"
              v-on:keyup="validateForm"
              :rule="rules"
            ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-text-field
              hide-details
              label="Vị trí"
              type="number"
              v-model="form.sort_order"
              v-on:keyup="validateForm"
              :rule="rules"
            ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-checkbox
              label="Gửi Sms"
              v-model="form.is_send_sms"
              :value="form.is_send_sms"
            ></v-checkbox>
          </v-layout>
          <v-layout row wrap>
            <v-textarea
              v-model="form.sms_content"
              type="text"
              name="input-10-1"
              label="Nội dung sms"
            ></v-textarea>
          </v-layout>
          <v-layout row justify-center>
            <v-card-title primary-title>Màu sắc</v-card-title>
          </v-layout>
          <v-layout row justify-center>
            <color-picker
              v-if="form.color != ''"
              :color="form.color"
              :sucker-hide="false"
              :sucker-canvas="suckerCanvas"
              :sucker-area="suckerArea"
              @changeColor="changeColor"
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
        color: "",
        sms_content: "",
        is_send_sms: false,
        sort_order: 0
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
        color: this.form.color,
        is_send_sms: this.form.is_send_sms,
        sms_content: this.form.sms_content,
        sort_order: this.form.sort_order
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.Update([url.receipt_status.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          window.location.href = "#/Receipt/ReceiptStatus";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Receipt/ReceiptStatus";
    },
    removeData() {
      this.isRemove = true;
    },
    async remove() {
      try {
        let rs = await this.DeleteById([url.receipt_status.id, this.form.id]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          window.location.href = "#/Receipt/ReceiptStatus";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    async getById(id) {
      try {
        let rs = await this.GetById([url.receipt_status.id, id]);
        if (typeof rs == "object") {
          this.form.id = rs.id;
          this.form.name = rs.name;
          this.form.color = rs.color;
          this.form.is_send_sms = rs.is_send_sms;
          this.form.sms_content = rs.sms_content;
          this.form.sort_order = rs.sort_order;
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