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
              >VIDIA</a
            >, All rights reserved.
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
    <v-snackbar
      :timeout="5000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="loadingDialog" persistent hide-overlay width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Đang tải dữ liệu
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
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
import { url } from "@/utils/index";
import ThemeSettings from "@/components/ThemeSettings";
import UpdatePassword from "@/components/UpdatePassword";
import AppEvents from "./event";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Firebase from "firebase";

Firebase.initializeApp(process.env.CONFIG);
const database = Firebase.database();
const notification = database.ref("user_notifications/" + this.id);
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings,
    UpdatePassword
  },
  // firebase: {
  //   notifications: notification
  // },
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
    //id: this.loggedUser == null ? 0 : this.loggedUser.i
  }),
  computed: {
    ...mapGetters(["loggedUser"])
  },
  watch: {
    loggedUser() {
      if (this.loggedUser != null) {
        //notification.on("value");
      }
    }
  },
  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
  mounted() {
    this.getUserAll();
    this.getBranchs();
    this.getProvinceAll();
    this.getRoleAll();
    this.getCountryAll();
    // notification.once("value", count => {
    //   console.log(count.val());
    // });
    if (this.loggedUser == null || !this.loggedUser.token) {
      this.logOut();
    }
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([
      "GetUserAll",
      "GetAll",
      "GetProvinceAll",
      "GetBranchAll",
      "GetRoleAll",
      "GetCountryAll",
      "LogOut"
    ]),
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
      window.location.href = "#" + this.$route.path + url;
    },
    getUserAll() {
      console.log("Lấy tất cả user");
      //this.GetUserAll();
    },
    getBranchs() {
      this.GetBranchAll();
    },
    getProvinceAll() {
      this.GetProvinceAll();
    },
    async getRoleAll() {
      this.GetRoleAll();
    },
    async getCountryAll() {
      await this.GetCountryAll();
    },
    logOut() {
      // notification.off("value");
      this.LogOut();
      this.$router.replace({ path: "/login" });
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