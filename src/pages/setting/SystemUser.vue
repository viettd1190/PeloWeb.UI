<template>
  <div style="min-height:400px">
    <title-page>Người dùng</title-page>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 lg6>
          <v-layout row wrap>
            <v-text-field
              hide-details
              label="Tên đăng nhập"
              v-model="userName"
              v-on:keyup="inputSearch"
              :clearable="true"
            ></v-text-field>
          </v-layout>
          <v-layout row wrap>
            <v-text-field
              hide-details
              label="Tên hiển thị"
              v-model="displayName"
              v-on:keyup="inputSearch"
              :clearable="true"
            ></v-text-field>
          </v-layout>
          <v-layout row wrap>
            <select2
              :options="branchs"
              :reduce="branch => branch.id"
              placeholder="Chi nhánh"
              label="name"
              v-model="selectedbranch"
              class="command-control"
            ></select2>
          </v-layout>
        </v-flex>
        <v-flex xs1 sm1 md1 lg1></v-flex>
        <v-flex xs12 sm12 md5 lg5>
          <v-layout row wrap>
            <v-text-field
              hide-details
              label="Tên đầy đủ"
              v-model="fullName"
              v-on:keyup="inputSearch"
              :clearable="true"
            ></v-text-field>
          </v-layout>
          <v-layout row wrap>
            <v-text-field
              hide-details
              label="Điện thoại"
              v-model="phone"
              v-on:keyup="inputSearch"
              :clearable="true"
            ></v-text-field>
          </v-layout>
          <v-layout row wrap>
            <select2
              :options="roles"
              :reduce="role => role.id"
              placeholder="Quyền"
              label="name"
              v-model="selectedrole"
              class="command-control"
            ></select2>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row class="row-command">
        <v-btn color="#666EE8" class="white--text" @click="search()">
          <v-icon>sort</v-icon>Lọc
        </v-btn>
        <v-btn color="orange" class="white--text" @click="add()">
          <v-icon>add</v-icon>Thêm mới
        </v-btn>
      </v-layout>
      <v-data-table
        item-key="id"
        :headers="table.headers"
        :items="datasourceFiltered"
        :pagination.sync="pagination"
        :total-items="pagination.totalRecords"
        :rows-per-page-items="[10, 20, 50, 100]"
        height="inherit"
        class="elevation-1"
        :loading="isLoading == 0"
        loading-text="Loading... Please wait"
      >
        <template slot="items" slot-scope="props">
          <tr class="table-row">
            <td nowrap>
              <v-avatar size="48">
                <img v-if="props.item.avatar != null" :src="props.item.avatar" @error="errorImgUrl" />
                <img v-else src="/static/avatar/no-avatar.jpg" />
              </v-avatar>
            </td>
            <td nowrap style="cursor:pointer" @click="select(props.item)">
              <a>{{ props.item.username }}</a>
            </td>
            <td nowrap>{{ props.item.full_name }}</td>
            <td nowrap>{{ props.item.display_name }}</td>
            <td nowrap style="cursor:pointer">
              <a
                style="text-decoration: none;"
                :href="`tel:${props.item.phone_number}`"
              >{{ props.item.phone_number }}</a>
            </td>
            <td nowrap>{{ props.item.branch }}</td>
            <td nowrap>{{ props.item.role }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import validate from "@/utils/validate";
import { url } from "@/utils/index";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { log } from "util";
import moment from "moment";
import TitlePage from "@/components/TitlePage";
import image from "@/assets/no-avatar.jpg";
export default {
  components: {
    TitlePage
  },
  props: {},
  data() {
    return {
      userName: "",
      displayName: "",
      fullName: "",
      phone: "",
      table: {
        headers: [
          {
            text: "Avatar",
            value: "avatar",
            align: "center"
          },
          {
            text: "Tên tài khoản",
            value: "username",
            align: "center",
            sortable: true
          },
          {
            text: "Họ tên",
            value: "full_name",
            align: "center",
            sortable: true
          },
          {
            text: "Tên hiển thị",
            value: "display_name",
            align: "center",
            sortable: true
          },
          {
            text: "Số điện thoại",
            value: "phone_number",
            align: "center",
            sortable: true
          },
          {
            text: "Chi nhánh",
            value: "branch",
            align: "center",
            sortable: true
          },
          {
            text: "Quyền",
            value: "role",
            align: "center"
          }
        ]
      },
      pagination: {
        page: 1,
        itemsPerPage: 10,
        rowsPerPage: 10,
        totalRecords: 0,
        sortBy: "username",
        descending: false
      },
      datasourceFiltered: [],
      isLoading: -1,
      branch: { id: 0, name: "" },
      role: { id: 0, name: "" },
      selectedbranch: null,
      selectedrole: null,
      imageerror: image
    };
  },
  computed: {
    ...mapGetters(["branchs", "roles"])
  },
  created() {},
  mounted() {},
  watch: {
    pagination: {
      handler() {
        this.search();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["GetList", "GetUser"]),
    async getList() {
      try {
        const {
          sortBy,
          descending,
          page,
          itemsPerPage,
          rowsPerPage
        } = this.pagination;
        if (this.isLoading < 0) {
          this.isLoading = 0;
        }
        if (this.isLoading == 0) {
          this.isLoading = 1;
          let rs = await this.GetList([
            url.user.route,
            {
              Page: page,
              PageSize: rowsPerPage,
              ColumnOrder: sortBy,
              SortDir: descending ? "desc" : "asc",
              Username: this.userName,
              DisplayName: this.displayName,
              FullName: this.fullName,
              PhoneNumber: this.phone,
              BranchId: this.selectedbranch,
              RoleId: this.selectedrole
            }
          ]);
          if (rs != null && rs.data) {
            this.isLoading = -1;
            this.datasourceFiltered = rs.data;
            this.pagination.totalRecords = rs.totalCount;
            this.pagination.itemsPerPage = rs.pageSize;
          } else {
            this.isLoading = -1;
            window.getApp.showMessage(rs, "error");
          }
        }
      } catch (error) {
        this.isLoading = -1;
      }
    },
    search() {
      this.getList();
    },
    add() {
      window.getApp.changeView("/Add");
    },
    select(item) {
      this.getById(item.id);
    },
    async getById(id) {
      window.getApp.changeView("/Edit/" + id);
    },
    inputSearch(e) {
      if (e.keyCode === 13) {
        this.search();
      }
    },
    errorImgUrl(event) {
      event.target.src = this.imageerror;
    }
  }
};
</script>

<style scop>
.table-row {
  height: 64px;
}
</style>
