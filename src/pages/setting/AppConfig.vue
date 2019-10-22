<template>
  <div style="min-height:400px">
    <title-page>Tham số cấu hình</title-page>    
    <v-container>
      <v-layout row justify-center>
      <v-flex xs12 sm6 md6 lg6>
        <v-text-field
          hide-details
          label="Tên tham số"
          v-model="name"
          append-icon="search"
          v-on:keyup="inputSearch"
          :clearable="true"
        ></v-text-field>
      </v-flex>
      <v-flex xs1 sm1 md1 lg1>       
      </v-flex>
      <v-flex xs12 sm6 md6 lg6>
        <v-text-field
          hide-details
          label="Giá trị"
          v-model="description"
          append-icon="search"
          v-on:keyup="inputSearch"
          :clearable="true"
        ></v-text-field>
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
            <td nowrap style="cursor:pointer" @click="selectConfig(props.item)">
              <a>{{ props.item.name }}</a>
            </td>
            <td nowrap>
              <v-layout>{{ props.item.value }}</v-layout>
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
import {url} from "@/utils/index";
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
      description: "",
      table: {
        headers: [
          {
            text: "Tên",
            value: "name",
            align: "center"
          },
          {
            text: "Giá trị",
            value: "value",
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
        sortBy: "name"
      },
      datasourceFiltered: [],
      isLoading: -1
    };
  },
  computed: {},
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
    ...mapActions(["GetList"]),
    async getAppConfigList() {
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
          let rs = await this.GetList([url.config.route,{
            Page: page,
            PageSize: rowsPerPage,
            ColumnOrder: sortBy,
            SortDir: descending ? "desc" : "asc",
            Name: this.name,
            Description: this.description
          }]);
          if (rs != null && rs.data) {
            this.isLoading = -1;
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
        window.getApp.showMessage(error, "error");
      }
    },
    search() {
      this.getAppConfigList();
    },
    add() {
      window.getApp.changeView("/Add");
    },
    selectConfig(item) {
      window.getApp.changeView("/Edit/" + item.id);
    },
    inputSearch(e) {
      if (e.keyCode === 13) {
        this.getAppConfigList();
      }
    }
  }
};
</script>

<style>
</style>
