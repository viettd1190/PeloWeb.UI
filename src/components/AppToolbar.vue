<template>
  <div>
    <v-toolbar color="primary" fixed dark app class="full-nav">
      <v-toolbar-title class="ml-0">
        <v-toolbar-side-icon
          @click.stop="handleDrawerToggle"
        ></v-toolbar-side-icon>
      </v-toolbar-title>
      <v-toolbar-title class="ml-0">
        <v-avatar size="32"><img :src="image"/></v-avatar>
        <span>{{ pageTitle }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-for="(item, index) in navItems"
          :key="index"
          flat
          :to="item.url"
          >{{ item.title }}</v-btn
        >
      </v-toolbar-items>
      <v-menu
        v-model="menu"
        :nudge-width="200"
        offset-y
        origin="center center"
        :nudge-bottom="12"
        :nudge-right="12"
      >
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-badge overlap color="red">
              <template v-slot:badge>
                <span>{{ noticounter }}</span>
              </template>
              <v-icon>
                notifications
              </v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list class="pa-0">
          <v-list-tile v-for="(item, i) in items" :key="i">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu
        offset-y
        origin="center center"
        :nudge-bottom="16"
        :nudge-right="12"
      >
        <v-toolbar-title class="ml-0 logged-user" slot="activator">
          <v-avatar size="32"
            ><img :src="avatar" @error="errorImgUrl"
          /></v-avatar>
          <span>
            <small v-if="loggedUser">
              {{ loggedUser == null ? "" : loggedUser.u }}
              <v-icon>expand_more</v-icon>
            </small>
          </span>
        </v-toolbar-title>
        <v-list class="pa-0">
          <v-list-tile @click="changePassword()" ripple="ripple" rel="noopener">
            <v-list-tile-action>
              <v-icon>loop</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Đổi mật khấu</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            @click="changeInformation()"
            ripple="ripple"
            rel="noopener"
          >
            <v-list-tile-action>
              <v-icon>build</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Cập nhật thông tin</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout()" ripple="ripple" rel="noopener">
            <v-list-tile-action>
              <v-icon>fullscreen_exit</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Đăng xuất</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import Util from "@/utils";
import { mapActions, mapMutations, mapGetters } from "vuex";
import menu from "@/api/menu";
import validate from "@/utils/validate";
import image from "@/assets/logo.png";

export default {
  name: "app-toolbar",
  data: () => ({
    image: image,
    avatar: image,
    pageTitle: "Vidia Admin",
    menuItems: [
      {
        icon: "person",
        title: "Phone",
        click: e => {}
      },
      {
        icon: "fullscreen_exit",
        href: "#",
        title: "Đăng xuất",
        click: e => {
          window.getApp.$emit("APP_LOGOUT");
        }
      }
    ],
    navItems: [
      // {
      //   title: "Home",
      //   url: "/home"
      // }
    ],
    searchText: "",
    loading: false,
    items: [
      { title: "Thông báo 1" },
      { title: "Thông báo 2" },
      { title: "Thông báo 3" },
      { title: "Thông báo 4" }
    ],
    fav: true,
    menu: false,
    message: false,
    hints: true,
    notificationCounter: 0
  }),
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    },
    ...mapGetters(["loggedUser", "noticounter"])
  },
  watch: {
    $route(to, from) {
      let path = this.$route.path;
      let item = this.navItems.filter(a => a.url === path)[0];
      if (item) {
        this.pageTitle = item.title;
      }
    },
    loggedUser() {
      if (this.loggedUser != null) {
        this.avatar = this.loggedUser.a;
      }
    },
    noticounter() {
      this.notificationCounter = this.noticounter;
    }
  },
  mounted() {
    this.menuItems[0].title = this.loggedUser
      ? this.loggedUser.u
      : this.loggedUser.d;
  },
  methods: {
    ...mapActions(["GetProfile"]),
    ...mapMutations(["SET_SEARCH_TEXT"]),

    handleDrawerToggle() {
      window.getApp.$emit("APP_DRAWER_TOGGLED");
    },

    handleFullScreen() {
      Util.toggleFullScreen();
    },

    logout() {
      window.getApp.logOut(); //.$emit("APP_LOGOUT");
    },
    changePassword() {
      window.getApp.updatePassword();
    },
    changeInformation() {
      this.getProfile();
    },
    async getProfile() {
      try {
        let rs = await this.GetProfile();
        if (rs != "") {
          window.getApp.showMessage(rs, "error");
        } else {
          window.location.href = "#/updateprofile";
        }
      } catch (error) {
        window.getApp.showMessage("Lỗi kết nối", "error");
      }
    },
    search() {
      if (this.searchText) {
        let keywordRemovedVietnamese = validate.transferVietnamese(
          this.searchText
        );
        this.loading = true;
        this.SET_SEARCH_TEXT(keywordRemovedVietnamese);
        this.SeachCompanyRequest({ Key: keywordRemovedVietnamese })
          .catch(_ => {
            window.getApp.showMessage(
              "Có lỗi xảy ra, vui lòng thử lại sau",
              "error"
            );
          })
          .finally(_ => {
            this.loading = false;
          });
      }
    },
    errorImgUrl(event) {
      event.target.src = "/static/logo.png";
    }
  }
};
</script>

<style lang="stylus" scoped>
.full-nav {
  padding-left: 0 !important;
  z-index: 1000;
}

.hambuger-button {
  margin-left: -15px;
}

.search-field {
  margin-top: 8px !important;
  padding-left: 40px !important;
  padding-right: 20px !important;
}

.logged-user {
  margin-top: -5px !important;
  margin-left: 24px !important;
}
</style>