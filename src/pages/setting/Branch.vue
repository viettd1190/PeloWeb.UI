<template>
  <div style="min-height:400px">
    <title-page>Chi nhánh</title-page>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 lg6>
          <v-layout row wrap>
            <v-text-field
              hide-details
              label="Tên chi nhánh"
              v-model="name"
              v-on:keyup="inputSearch"
              :clearable="true"
            ></v-text-field>
          </v-layout>
          <v-layout row wrap>
            <v-text-field
              hide-details
              label="Hotline"
              v-model="hotline"
              v-on:keyup="inputSearch"
              :clearable="true"
            ></v-text-field>
          </v-layout>
        </v-flex>
        <v-flex xs1 sm1 md1 lg1></v-flex>
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
              :loading="selectDistricts.length == 0 && selectedProvince != null"
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
              <v-layout>{{ props.item.hotline }}</v-layout>
            </td>
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
      name: "",
      hotline: "",
      table: {
        headers: [
          {
            text: "Chi nhánh",
            value: "name",
            align: "center"
          },
          {
            text: "Hot line",
            value: "hotline",
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
      selectedProvince: null,
      selectedDistrict: null,
      selectedWard: null
    };
  },
  computed: {
    ...mapGetters(["provinces", "districts", "wards"])
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
            url.branch.route,
            {
              Page: page,
              PageSize: rowsPerPage,
              ColumnOrder: sortBy,
              SortDir: descending ? "desc" : "asc",
              Name: this.name,
              Hotline: this.hotline,
              Address: this.address,
              ProvinceId:
                this.selectedProvince == null ? 0 : this.selectedProvince,
              DistrictId:
                this.selectedDistrict == null ? 0 : this.selectedDistrict,
              WardId: this.selectedWard == null ? 0 : this.selectedWard
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
    async syncSelect() {
      //this.GetDistricts({ ProvinceId: 0 });
      // this.GetWards({
      //   ProvinceId: 0,
      //   DistrictId: 0
      // });
    },
    inputSearch(e) {
      if (e.keyCode === 13) {
        this.search();
      }
    },
    changeProvince() {
      this.GetDistricts({ ProvinceId: this.selectedProvince });
      this.selectWards = [];
      //this.GetWards({ ProvinceId: this.selectedProvince, DistrictId: this.selectedDistrict });
    },
    changeDistrict() {
      this.GetWards({
        ProvinceId: this.selectedProvince,
        DistrictId: this.selectedDistrict
      });
    }
  }
};
</script>

<style>
</style>
