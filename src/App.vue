<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-toolbar class="app--toolbar"></app-toolbar>
        <!-- <app-drawer class="app--drawer"></app-drawer> -->
        <v-content>
          <!-- Page Header -->
          <!-- <page-header v-if="$route.meta.breadcrumb"></page-header> -->
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
        </v-content>
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
    <update-password v-if="isUpdatePass==0"></update-password>
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
import { mapGetters, mapMutations } from "vuex";
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
    loadingDialog: false
  }),
  computed: {
    ...mapGetters([
      "points",
      "selectPoint",
      "isUpdatePass",
      "selectRoute",
      "routes"
    ])
  },
  watch: {
    isUpdatePass() {
      if (this.isUpdatePass == 1) {
        this.showMessage("Cập nhật thành công", "success");
        this.SET_UPDATE_PASSWORD_STATE(-1);
      }
    }
  },
  created() {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
  methods: {
    ...mapMutations([
      "SET_EDIT_POINT_STATE",
      "SET_UPDATE_PASSWORD_STATE",
      "SET_EDIT_POINT"
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
    EditPoint(id) {
      let point = null;
      for (var i = 0; i < this.points.length; i++) {
        if (this.points[i].id == id) {
          this.SET_EDIT_POINT_STATE(this.points[i]);
          break;
        }
      }
    },
    SetEditPoint(point) {
      console.log(point);
      console.log(this.selectRoute);
      if (point != "" && this.selectRoute != "") {
        let pointsfromroutes = this.routes.Routes.filter(
          c => c.Id == this.selectRoute
        )[0].Points;
        let editPoint = pointsfromroutes.filter(c => c.Id == point)[0];
        console.log(editPoint);
        this.SET_EDIT_POINT(editPoint);
      }
    },
    updatePassword() {
      this.SET_UPDATE_PASSWORD_STATE(0);
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