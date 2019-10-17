<template>
  <div style="min-height:400px">
    <title-page>Menu điều hướng</title-page>
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
            <td nowrap style="cursor:pointer" @click="select(props.item)">
              <a>{{ props.item.name }}</a>
            </td>
            <td nowrap>
              <v-layout>{{ props.item.address }}</v-layout>
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
    TitlePage,
  },
  props: {
  },
  data() {
    return {
      name: "",
      hotline: "",
      address:"",
      table: {
        headers: [
          {
            text: "Chi nhánh",
            value: "name",
            align: "center"
          },
          {
            text: "Địa chỉ",
            value: "address",
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
        descending:false
      },
      datasourceFiltered: [],
      isLoading: true,
    };
  },
  computed: {},
  created() {
    this.getList();
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
    ...mapActions(["GetBranchs","GetBranch"]),
    async getList() {
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
          let rs = await this.GetBranchs({
            Page: page,
            PageSize: rowsPerPage,
            ColumnOrder: sortBy,
            SortDir: descending ? "desc" : "asc",
            Name: this.name,
            Hotline: this.hotline,
            Address:this.address
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
      this.getList();
    },
    add() {
      window.getApp.changeView("/Add");
    },
    select(item){
      this.getById(item.id);      
    },
    async getById(id) {
      let rs = await this.GetBranch(id);
      if (rs !== "") {
        window.getApp.changeView("/Edit/"+id);
      } else {
        this.$destroy();
        window.location.href = "#/404";
      }
    }
  }
};
</script>

<style>
</style>
