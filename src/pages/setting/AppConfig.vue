<template>
  <div style="min-height:400px">
    <title-page>Tham số cấu hình</title-page>
    <v-layout row justify-center>
      <v-flex xs12 sm3 md3 lg3>
        <v-text-field
          hide-details
          label="Tên tham số"
          v-model="name"
          class="ma-2"
          append-icon="search"
          v-on:keyup="inputSearch"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md3 lg3>
        <v-text-field
          class="ma-2"
          hide-details
          label="Giá trị"
          v-model="description"
          append-icon="search"
          v-on:keyup="inputSearch"
        ></v-text-field>
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
        dense
        :headers="table.headers"
        :items="datasourceFiltered"
        :pagination.sync="pagination"
        :total-items="pagination.totalRecords"
        :rows-per-page-items="[10,20,50,100]"
        height="inherit"
        class="elevation-1"
        :loading="isLoading"
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
    TitlePage,
  },
  props: {
  },
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
      isLoading: true,
    };
  },
  computed: {},
  created() {
    this.getAppConfigList();
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
    ...mapActions(["GetAppConfigList","GetAppConfig"]),
    async getAppConfigList() {
      try {
        const {
          sortBy,
          descending,
          page,
          itemsPerPage,
          rowsPerPage
        } = this.pagination;
        this.isLoading = true;
        if (this.isLoading) {
          let rs = await this.GetAppConfigList({
            Page: page,
            PageSize: rowsPerPage,
            ColumnOrder: sortBy,
            SortDir: descending ? "desc" : "asc",
            Name: this.name,
            Description: this.description
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
        window.getApp.showMessage(error, "error");
      }
    },
    search() {
      this.getAppConfigList();
    },
    add() {
      window.getApp.changeView("/Add");
      //window.location.href="#/Setting/AppConfig/Add";
    },
    selectConfig(item){
      this.getAppConfigById(item.id);      
      //window.location.href="#/Setting/AppConfig/Edit/"+item.id;
    },
    async getAppConfigById(id) {
      let rs = await this.GetAppConfig(id);
      if (rs != "") {
        window.getApp.changeView("/Edit/"+id);
      } else {
        this.$destroy();
        this.STATE_UPDATE_EDIT_APPCONFIG(null);
        window.location.href = "#/404";
      }
    },
    
    inputSearch(e) {
      if (e.keyCode === 13) {
        this.getAppConfigList();
      }
    },
  }
};
</script>

<style>
</style>
