<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-toolbar class="app--toolbar"></app-toolbar>
        <app-drawer class="app--drawer"></app-drawer>
        <v-content>
          <!-- Page Header -->
          <!-- <page-header v-if="$route.meta.breadcrumb"></page-header> -->
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
        </v-content>
        <v-footer height="auto" class="white pa-3 app--footer">
          <v-spacer />
          <span class="caption">
            Copyright &copy; {{ new Date().getFullYear() }}
            <a
              class="text-bold-800 darken-2"
              href="http://vidia.vn"
              target="_blank"
            >VIDIA</a>, All rights reserved.
          </span>
          <v-spacer />
        </v-footer>
        <!-- <app-fab></app-fab> -->
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar :timeout="5000" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="loadingDialog" persistent hide-overlay width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Đang tải dữ liệu
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <update-password
      v-if="showUpdatePassword"
      :isShow="showUpdatePassword"
      @closeUpdatePassword="closeUpdatePassword"
    ></update-password>
  </div>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";
import PageHeader from "@/components/PageHeader";
import menu from "@/api/menu";
import ThemeSettings from "@/components/ThemeSettings";
import UpdatePassword from "@/components/UpdatePassword";
import AppEvents from "./event";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings,
    UpdatePassword
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: "",
      color: ""
    },
    loadingDialog: false,
    showUpdatePassword: false
  }),
  computed: {
    ...mapGetters([])
  },
  watch: {},
  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;    
  },
  mounted(){
    this.getUserAll();
    this.getBranchs();
    this.getProvinceAll();
    this.getRoleAll();
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(["GetUserAll","GetBranchAll","GetProvinceAll","GetRoleAll"]),
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    },
    showMessage(text, type = "success") {
      this.snackbar = {
        show: true,
        text: text,
        color: type === "error" ? "red" : "green"
      };
    },
    formatErrorCode(code) {
      switch (code) {
        case "ERR_EMAIL_OR_USERNAME_USED":
          return "Email hoặc Tên đăng nhập đã tồn tại.";
          break;
        default:
          return null;
      }
    },
    showLoading(isShow) {
      this.loadingDialog = isShow;
    },
    updatePassword() {
      this.showUpdatePassword = true;
    },
    closeUpdatePassword(value) {
      if (value) {
        this.showMessage("Cập nhật thành công", "success");
      }
      this.showUpdatePassword = false;
    },
    changeView(url) {
      window.location.href = "#"+this.$route.path + url;
    },
    getUserAll(){
      console.log("Lấy tất cả user");      
      //this.GetUserAll();
    },
    getBranchs(){
      this.GetBranchAll();
    },
    getProvinceAll(){
      this.GetProvinceAll();
    },
    async getRoleAll() {
      this.GetRoleAll();
    }
  }
};
</script>

<style lang="stylus" scoped>
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}

.transparent {
  background: none;
}

.left {
  float: left;
}

.right {
  float: right;
}

.clear {
  clear: both;
}
</style>