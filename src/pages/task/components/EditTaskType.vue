<template>
  <div class="text-xs-center">
    <v-card>
      <title-page>Cập nhật loại công việc</title-page>
      <v-container>
        <v-form ref="form" v-model="valid">
          <v-layout row justify-center>
            <v-text-field
              hide-details
              label="Tên"
              v-model="form.name"
              class="ma-2"
              append-icon="search"
              v-on:keyup="validateForm"
              :rule="rules"
            ></v-text-field>
          </v-layout>
          <v-layout row justify-center>
            <v-text-field
              hide-details
              label="Vị trí"
              v-model="form.sort_order"
              append-icon="search"
              v-on:keyup="validateForm"
              :rule="rules"
              type="number"
            ></v-text-field>
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
        sort_order: this.form.sort_order
      };
      this.update(p);
    },
    async update(model) {
      try {
        let rs = await this.Update([url.task_type.route, model]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.UpdateSuccess,
            messageResult.Success
          );
          window.location.href = "#/Task/TaskType";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    close() {
      window.location.href = "#/Task/TaskType";
    },
    removeData() {
      this.isRemove = true;
    },
    async remove() {
      try {
        let rs = await this.DeleteById([url.task_type.id, this.form.id]);
        if (typeof rs == "string") {
          window.getApp.showMessage(rs, messageResult.Error);
        } else {
          window.getApp.showMessage(
            messageResult.DeleteSuccess,
            messageResult.Success
          );
          window.location.href = "#/Task/TaskType";
        }
      } catch (error) {
        window.getApp.showMessage(error, messageResult.Error);
      }
    },
    async getById(id) {
      try {
        let rs = await this.GetById([url.task_type.id, id]);
        if (typeof rs == "object") {
          this.form.id = rs.id;
          this.form.name = rs.name;
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
    }
  }
};
</script>
<style>
</style>