<template>
  <transition name="updatePassword">
    <div class="modal-mask" @click="close">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3>Cập nhật mật khẩu</h3>
        </div>
        <div class="modal-body">
          <v-form>
            <v-container>
              <v-layout>
                <v-flex>
                  <v-text-field
                    v-model="oldpassword"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Mật khẩu cũ"
                    hint="At least 6 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    v-model="newPassword"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Mật khẩu mới"
                    hint="At least 6 characters"
                    counter
                    @click:append="show2 = !show2"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmNewPassword"
                    :append-icon="show3 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required,rules.match]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Xác nhận mật khẩu mới"
                    hint="At least 6 characters"
                    counter
                    @click:append="show3 = !show3"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </div>
        <div class="modal-footer text-right">
          <v-btn class="default" @click="close()">Đóng</v-btn>
          <v-btn class="primary" @click="save()">Cập nhật</v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { async } from 'q';
export default {
  name: "updatePassword",
  props: {
  },
  data() {
    return {
      oldpassword: "",
      newPassword: "",
      confirmNewPassword: "",
      show1: false,
      show2: false,
      show3: false,
      rules: {
        required: value => !!value || "Bắt buộc nhập.",
        match: value => value==this.newPassword||"Xác nhận mật khẩu không khớp."
      }
    };
  },
  created() {},
  methods: {
    ...mapMutations(["SET_UPDATE_PASSWORD_STATE"]),
    ...mapActions(["UpdatePassword"]),
    validateForm(e) {
      if (e.keyCode === 13) {
        this.save();
      }
    },
    save(){
        if(this.newPassword!==this.confirmNewPassword){
            return;
        };
        let p = {
            OldPassword: this.oldpassword,
            NewPassword: this.newPassword
        }
        this.updatePass(p);
    },
    async updatePass(model){
        let rs = await this.UpdatePassword(model);
    },
    close(){
      this.SET_UPDATE_PASSWORD_STATE(-1);
    }
  }
};
</script>
<style>
* {
  box-sizing: border-box;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 40%;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #1976d2;
}

.modal-body {
  margin: 20px 0;
}

.text-right {
  text-align: right;
}

.form-label {
  display: block;
  margin-bottom: 1em;
}

.form-label > .form-control {
  margin-top: 0.5em;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5em 1em;
  line-height: 1.5;
  border: 1px solid #ddd;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>