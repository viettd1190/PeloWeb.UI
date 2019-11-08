<template>
  <div style="min-height:400px">
    <title-page>Danh sách khách hàng</title-page>
    <v-expansion-panel expand v-model="panel" :readonly="readonly">
      <v-expansion-panel-content>
        <v-layout row wrap>
          <v-flex xs12 sm12 md6 lg6>
            <v-layout row wrap>
              <v-text-field
                hide-details
                label="Tên"
                v-model="name"
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
              <v-text-field
                hide-details
                label="Địa chỉ"
                v-model="address"
                v-on:keyup="inputSearch"
                :clearable="true"
              ></v-text-field>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md1 lg1> </v-flex>
          <v-flex xs12 sm12 md5 lg5>
            <v-layout row wrap>
              <select2
                :options="provinces"
                :reduce="province => province.id"
                placeholder="Tỉnh thành"
                label="name"
                v-model="selectedProvince"
                class="command-control"
              ></select2>
            </v-layout>
            <v-layout row wrap>
              <select2
                :options="selectDistricts"
                :reduce="district => district.id"
                placeholder="Quận huyện"
                label="name"
                v-model="selectedDistrict"
                :loading="
                  selectDistricts.length == 0 && selectedProvince != null
                "
                class="command-control"
              ></select2>
            </v-layout>
            <v-layout row wrap>
              <select2
                :options="selectWards"
                :reduce="ward => ward.id"
                placeholder="Xã phường"
                label="name"
                v-model="selectedWard"
                :loading="selectWards.length == 0 && selectedDistrict != null"
                class="command-control"
              ></select2>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
      <v-btn @click="expanse()"
        ><v-icon>{{ icon }}</v-icon></v-btn
      >
    </v-expansion-panel>
    <v-container>
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
        dense
        :headers="table.headers"
        :items="datasourceFiltered"
        :pagination.sync="pagination"
        :total-items="pagination.totalRecords"
        :rows-per-page-items="[10, 20, 50, 100]"
        height="inherit"
        class="elevation-1"
        :loading="isLoading == 1"
        loading-text="Loading... Please wait"
      >
        <template slot="items" slot-scope="props">
          <tr class="table-row">
            <td nowrap style="cursor:pointer" @click="select(props.item)">
              <a>{{ props.item.name }}</a>
            </td>
            <td nowrap style="cursor:pointer">
              <a
                style="text-decoration: none;"
                :href="`tel:${props.item.phone}`"
                >{{ props.item.phone }}</a
              >
            </td>
            <td nowrap>{{ props.item.email }}</td>
            <td nowrap>{{ props.item.address }}</td>
            <td nowrap>{{ props.item.ward }}</td>
            <td nowrap>{{ props.item.district }}</td>
            <td nowrap>{{ props.item.province }}</td>
            <td nowrap>{{ props.item.description }}</td>
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
export default {
  components: {
    TitlePage
  },
  props: {},
  data() {
    return {
      panel: [false],
      disabled: false,
      readonly: false,
      icon: "arrow_drop_down",
      name: "",
      phone: "",
      address: "",
      table: {
        headers: [
          {
            text: "Tên",
            value: "name",
            align: "center",
            sortable: true,
            class: "blue--text text--lighten-1"
          },
          {
            text: "Số điện thoại",
            value: "phone",
            align: "center"
          },
          {
            text: "Email",
            value: "email",
            align: "center"
          },
          {
            text: "Địa chỉ",
            value: "address",
            align: "center"
          },
          {
            text: "Xã phường",
            value: "ward",
            align: "center"
          },
          {
            text: "Quận huyên",
            value: "district",
            align: "center"
          },
          {
            text: "Tỉnh thành",
            value: "province",
            align: "center"
          },
          {
            text: "Ghi chú",
            value: "description",
            align: "center"
          }
        ]
      },
      pagination: {
        page: 1,
        itemsPerPage: 10,
        rowsPerPage: 10,
        totalRecords: 0,
        sortBy: "name",
        descending: false
      },
      datasourceFiltered: [],
      isLoading: -1,
      selectDistricts: [],
      selectWards: [],
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" },
      ward: { id: 0, name: "", type: "" },
      selectedProvince: null,
      selectedDistrict: null,
      selectedWard: null
    };
  },
  computed: { ...mapGetters(["provinces", "districts", "wards"]) },
  created() {
    this.syncSelect();
  },
  mounted() {},
  watch: {
    pagination: {
      handler() {
        this.search();
      },
      deep: true
    },
    districts() {
      this.selectDistricts = this.districts;
    },
    wards() {
      this.selectWards = this.wards;
    },
    selectedProvince() {
      this.changeProvince();
    },
    selectedDistrict() {
      this.changeDistrict();
    }
  },
  methods: {
    ...mapActions(["GetList", "GetDistricts", "GetWards"]),
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
            url.customer.route,
            {
              Page: page,
              PageSize: rowsPerPage,
              ColumnOrder: sortBy,
              SortDir: descending ? "desc" : "asc",
              Name: this.name,
              Phone: this.phone,
              Email: this.email,
              ProvinceId: this.selectedProvince,
              DistrictId: this.selectedDistrict,
              WardId: this.selectedWard,
              Address: this.address,
              Description: this.description
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
    getById(id) {
      window.getApp.changeView("/Edit/" + id);
    },
    inputSearch(e) {
      if (e.keyCode === 13) {
        this.search();
      }
    },
    async syncSelect() {
      //this.GetDistricts({ ProvinceId: this.selectedProvince });
    },
    changeProvince() {
      this.GetDistricts({ ProvinceId: this.selectedProvince });
      this.selectWards = [];
      //this.GetWards({ ProvinceId: this.selectedProvince, DistrictId: 0 });
    },
    changeDistrict() {
      this.GetWards({
        ProvinceId: this.selectedProvince != null ? this.selectedProvince : 0,
        DistrictId: this.selectedDistrict
      });
    },
    expanse() {
      //this.panel[0] = !this.panel[0];
      if (this.panel[0]) {
        this.panel = [false];
        this.icon = "arrow_drop_down";
      } else {
        this.panel = [true];
        this.icon = "arrow_drop_up";
      }
    }
  }
};
</script>

<style>
</style>
