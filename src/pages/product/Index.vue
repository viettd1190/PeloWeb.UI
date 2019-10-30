<template>
  <div style="min-height:400px">
    <title-page>Danh sách sản phẩm</title-page>
    <v-expansion-panel expand v-model="panel" :readonly="readonly">
      <v-expansion-panel-content>
        <v-layout row wrap>
          <v-flex xs12 sm12 md6 lg6>
            <v-layout row wrap>
              <v-text-field
                hide-details
                label="Tên sản phẩm"
                v-model="name"
                v-on:keyup="inputSearch"
                :clearable="true"
              ></v-text-field>
            </v-layout>
            <v-layout row wrap>
              <select2
                :options="productGroups"
                :reduce="productGroup => productGroup.id"
                placeholder="Nhóm sản phẩm"
                label="name"
                v-model="product_group_id"
                class="command-control"
              ></select2>
            </v-layout>
            <v-layout row wrap>
              <v-text-field
                hide-details
                label="Ghi chú"
                v-model="description"
                v-on:keyup="inputSearch"
                :clearable="true"
              ></v-text-field>
            </v-layout>
          </v-flex>
          <v-flex xs1 sm1 md1 lg1></v-flex>
          <v-flex xs12 sm12 md5 lg5>
            <v-layout row wrap>
              <select2
                :options="productUnits"
                :reduce="productUnit => productUnit.id"
                placeholder="Đơn vị tính"
                label="name"
                v-model="product_unit_id"
                class="command-control"
              ></select2>
            </v-layout>
            <v-layout row wrap>
              <select2
                :options="manufacturers"
                :reduce="manufacturer => manufacturer.id"
                placeholder="Thương hiệu"
                label="name"
                v-model="manufacturer_id"
                class="command-control"
              ></select2>
            </v-layout>
            <v-layout row wrap>
              <select2
                :options="productStatuses"
                :reduce="productStatus => productStatus.id"
                placeholder="Trạng thái sản phẩm"
                label="name"
                v-model="product_status_id"
                class="command-control"
              ></select2>
            </v-layout>
            <v-layout row wrap>
              <select2
                :options="countries"
                :reduce="country => country.id"
                placeholder="Xuất xứ"
                label="name"
                v-model="country_id"
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
            <td nowrap>
              <v-layout>{{ props.item.import_price }}</v-layout>
            </td>
            <td nowrap>
              <v-layout>{{ props.item.sell_price }}</v-layout>
            </td>
            <td nowrap>
              <v-layout>{{ props.item.product_group }}</v-layout>
            </td>
            <td nowrap>
              <v-layout>{{ props.item.warranty_month }} &nbsp; tháng</v-layout>
            </td>
            <td nowrap>
              <v-layout>{{ props.item.description }}</v-layout>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import validate from "@/utils/validate";
import { messageResult, url } from "@/utils/index";
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
      description: "",
      table: {
        headers: [
          {
            text: "Tên sản phẩm",
            value: "name",
            align: "center",
            sortable: true,
            class: "blue--text text--lighten-1"
          },
          {
            text: "Giá nhập",
            value: "import_price",
            align: "center",
            class: "blue--text text--lighten-1"
          },
          {
            text: "Giá bán lẻ",
            value: "sell_price",
            align: "center",
            class: "blue--text text--lighten-1"
          },
          {
            text: "Nhóm sản phẩm",
            value: "product_group",
            align: "center"
          },
          {
            text: "Bảo hành",
            value: "warranty_month",
            align: "center"
          },
          {
            text: "Mô tả",
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
      productStatuses: [],
      productGroups: [],
      manufacturers: [],
      productUnits: [],
      product_group_id: null,
      product_unit_id: null,
      manufacturer_id: null,
      product_status_id: null,
      country_id: null
    };
  },
  computed: {
    ...mapGetters(["countries"])
  },
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
    }
  },
  methods: {
    ...mapActions(["GetList", "GetDistricts", "GetWards", "GetAll"]),

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
            url.product.route,
            {
              Page: page,
              PageSize: rowsPerPage,
              ColumnOrder: sortBy,
              SortDir: descending ? "desc" : "asc",
              name: this.name,
              description: this.description,
              product_group_id: this.product_group_id,
              product_unit_id: this.product_unit_id,
              manufacturer_id: this.manufacturer_id,
              product_status_id: this.product_status_id,
              country_id: this.country_id
            }
          ]);
          if (rs != null && rs.data) {
            this.isLoading = -1;
            this.datasourceFiltered = rs.data;
            this.pagination.totalRecords = rs.totalCount;
            this.pagination.itemsPerPage = rs.pageSize;
          } else {
            this.isLoading = -1;
            window.getApp.showMessage(rs, messageResult.Error);
          }
        }
      } catch (error) {
        this.isLoading = -1;
        window.getApp.showMessage(
          messageResult.RequestFail,
          messageResult.Error
        );
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
    async syncSelect() {
      this.getProductGroup();
      this.getProductUnit();
      this.getManufacturer();
      this.getProductStatus();
    },
    async getProductGroup() {
      try {
        let rs = await this.GetAll(url.productGroup.all);
        if (typeof rs == "object") {
          this.productGroups = rs;
        }
      } catch (error) {
        this.productGroups = [];
      }
    },
    async getProductUnit() {
      try {
        let rs = await this.GetAll(url.product_unit.all);
        if (typeof rs == "object") {
          this.productUnits = rs;
        }
      } catch (error) {
        this.productUnits = [];
      }
    },
    async getManufacturer() {
      try {
        let rs = await this.GetAll(url.manufacturer.all);
        if (typeof rs == "object") {
          this.manufacturers = rs;
        }
      } catch (error) {
        this.manufacturers = [];
      }
    },
    async getProductStatus() {
       try {
        let rs = await this.GetAll(url.product_status.all);
        if (typeof rs == "object") {
          this.productStatuses = rs;
        }
      } catch (error) {
        this.productStatuses = [];
      }
    },
    inputSearch(e) {
      if (e.keyCode === 13) {
        this.search();
      }
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
