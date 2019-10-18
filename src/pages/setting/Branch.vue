<template>
  <div style="min-height:400px">
    <title-page>Chi nhánh</title-page>    
    <v-layout row justify-center>
      <v-flex xs12 sm6 md4 lg4>
        <v-text-field
          hide-details
          label="Tên chi nhánh"
          v-model="name"
          class="ma-2"
          append-icon="store"
          v-on:keyup="inputSearch"
          :clearable="true"
        ></v-text-field>
        <v-text-field
          class="ma-2"
          hide-details
          label="Hotline"
          v-model="hotline"
          append-icon="phone"
          v-on:keyup="inputSearch"
          :clearable="true"
        ></v-text-field>
        <v-btn color="#666EE8" class="white--text" @click="search()">
          <v-icon>sort</v-icon>Lọc
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 md4 lg4>
        <v-select
          :items="selectProvinces"
          item-text="name"
          item-value="id"
          v-model="province"
          label="Tỉnh thành"
          persistent-hint
          return-object
        ></v-select>
        <v-select
          :items="selectDistricts"
          item-text="name"
          item-value="id"
          v-model="province"
          label="Quận Huyện"
          persistent-hint
          return-object
        ></v-select>
        <v-select
          :items="selectWards"
          item-text="name"
          item-value="id"
          v-model="province"
          label="Xã phường"
          persistent-hint
          return-object
        ></v-select>
      </v-flex>
    </v-layout>
    <v-container>
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
        :loading="isLoading"
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
      isLoading: true,
      selectProvinces: [],
      selectDistricts: [],
      selectWards: [],
      province: { id: 0, name: "", type: "" },
      district: { id: 0, name: "", type: "" },
      ward: { id: 0, name: "", type: "" }
    };
  },
  computed: {
    ...mapGetters(["provinces", "districts", "wards"])
  },
  created() {
    this.syncSelect();
    this.search();    
  },
  mounted() {},
  watch: {
    pagination: {
      handler() {
        this.search();
      },
      deep: true
    },
    provinces() {
      this.selectProvinces = this.provinces;
    },
    districts() {
      this.selectDistricts = this.districts;
    },
    wards() {
      this.selectWards = this.wards;
    }
  },
  methods: {
    ...mapActions([
      "GetBranchs",
      "GetBranch",
      "GetProvinces",
      "GetDistricts",
      "GetWards"
    ]),
    async getList() {
      try {
        const {
          sortBy,
          descending,
          page,
          itemsPerPage,
          rowsPerPage
        } = this.pagination;        
        if (this.isLoading) {
          let rs = await this.GetBranchs({
            Page: page,
            PageSize: rowsPerPage,
            ColumnOrder: sortBy,
            SortDir: descending ? "desc" : "asc",
            Name: this.name,
            Hotline: this.hotline,
            Address: this.address,
            ProvinceId: this.province.id,
            DistrictId: this.district.id,
            WardId: this.ward.id
          });
          if (rs != null && rs.data) {
            this.isLoading = false;
            this.datasourceFiltered = rs.data;
            this.pagination.totalRecords = rs.totalCount;
            this.pagination.itemsPerPage = rs.pageSize;
          } else {
            this.isLoading = false;
            window.getApp.showMessage(rs, "error");
          }
        }
      } catch (error) {
        this.isLoading = false;
      }
    },
    search() {
      this.isLoading = true;
      this.getList();
    },
    add() {
      window.getApp.changeView("/Add");
    },
    select(item) {
      this.getById(item.id);
    },
    async getById(id) {
      let rs = await this.GetBranch(id);
      if (rs !== "") {
        window.getApp.changeView("/Edit/" + id);
      } else {
        this.$destroy();
        window.location.href = "#/404";
      }
    },
    syncSelect() {
      this.GetProvinces();
      this.GetDistricts(0);
      this.GetWards(0);
    },
    inputSearch(e) {
      if (e.keyCode === 13) {
        this.search();
      }
    },    
  }
};
</script>

<style>
</style>
