<template>
  <div style="min-height:400px">
    <title-page>Người dùng</title-page>
    <v-layout row justify-center>
      <v-flex xs12 sm3 md3 lg3>
        <v-text-field
          hide-details
          label="Tên đăng nhập"
          v-model="userName"
          class="ma-2"
          append-icon="person"
          v-on:keyup="inputSearch"
          :clearable="true"
        ></v-text-field>
      </v-flex>
      <v-flex hidden-xs-only sm1 md1 lg1> </v-flex>
      <v-flex xs12 sm3 md3 lg3>
        <v-text-field
          class="ma-2"
          hide-details
          label="Tên hiển thị"
          v-model="displayName"
          append-icon="face"
          v-on:keyup="inputSearch"
          :clearable="true"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm3 md3 lg3>
        <v-text-field
          hide-details
          label="Tên đầy đủ"
          v-model="fullName"
          class="ma-2"
          append-icon="assignment_ind"
          v-on:keyup="inputSearch"
          :clearable="true"
        ></v-text-field>
      </v-flex>
      <v-flex hidden-xs-only sm1 md1 lg1> </v-flex>
      <v-flex xs12 sm3 md3 lg3>
        <v-text-field
          class="ma-2"
          hide-details
          label="Điện thoại"
          v-model="phone"
          append-icon="phone"
          v-on:keyup="inputSearch"
          :clearable="true"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm3 md3 lg3>
        <v-select
          :items="branchs"
          item-text="name"
          item-value="id"
          v-model="branch"
          label="Chi nhánh"
          persistent-hint
          return-object
        ></v-select>
      </v-flex>
      <v-flex hidden-xs-only sm1 md1 lg1> </v-flex>
      <v-flex xs12 sm3 md3 lg3>
        <v-select
          :items="roles"
          item-text="name"
          item-value="id"
          v-model="role"
          label="Quyền"
          persistent-hint
          return-object
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs4 sm2 md1 lg1>
        <v-btn color="#666EE8" class="white--text" @click="search()">
          <v-icon>sort</v-icon>Lọc
        </v-btn>
      </v-flex>
    </v-layout>
    <v-container>
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
                <img
                  v-if="props.item.avatar != null"
                  :src="props.item.avatar"
                  @error="errorImgUrl"
                />
                <img v-else src="/static/avatar/no-avatar.jpg" />
              </v-avatar>
            </td>
            <td nowrap style="cursor:pointer" @click="select(props.item)">
              <a>{{ props.item.username }}</a>
            </td>
            <td nowrap>
              {{ props.item.full_name }}
            </td>
            <td nowrap>
              {{ props.item.display_name }}
            </td>
            <td nowrap style="cursor:pointer">
              <a
                style="text-decoration: none;"
                :href="`tel:${props.item.phone_number}`"
                >{{ props.item.phone_number }}</a
              >
            </td>
            <td nowrap>
              {{ props.item.branch }}
            </td>
            <td nowrap>
              {{ props.item.role }}
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-btn color="#666EE8" class="white--text" @click="add()">
        <v-icon>add</v-icon>Thêm mới
      </v-btn>
    </v-container>
  </div>
</template>
<script>
import validate from "@/utils/validate";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { log } from "util";
import moment from "moment";
import TitlePage from "@/components/TitlePage";
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
      role: { id: 0, name: "" }
    };
  },
  computed: {
    ...mapGetters(["branchs", "roles"])
  },
  created() {
  },
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
    ...mapActions(["GetUsers", "GetUser"]),
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
          let rs = await this.GetUsers({
            Page: page,
            PageSize: rowsPerPage,
            ColumnOrder: sortBy,
            SortDir: descending ? "desc" : "asc",
            Username: this.userName,
            DisplayName: this.displayName,
            FullName: this.fullName,
            PhoneNumber: this.phone,
            BranchId: this.branch.id,
            RoleId: 0 //this.role.id
          });
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
      let rs = await this.GetUser(id);
      if (typeof rs == "object") {
        window.getApp.changeView("/Edit/" + id);
      } else {
        window.location.href = "#/404";
      }
    },
    inputSearch(e) {
      if (e.keyCode === 13) {
        this.search();
      }
    },
    errorImgUrl(event) {
      event.target.src = "/static/avatar/no-avatar.png";
    }
  }
};
</script>

<style scop>
.table-row {
  height: 64px;
}
</style>
