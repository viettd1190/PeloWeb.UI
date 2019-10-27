<template>
  <div style="min-height:400px">
    <title-page>Danh sách CRM</title-page>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 lg6>
          <v-layout row wrap>
            <v-text-field
              hide-details
              label="Tên"
              v-model="name"
              append-icon="search"
              v-on:keyup="inputSearch"
              :clearable="true"
            ></v-text-field>
          </v-layout>
          <v-layout row wrap>
            <select2
              :options="cmrStatuses"
              :reduce="crmStatus => crmStatus.id"
              placeholder="Trạng thái"
              label="name"
              v-model="statusId"
              class="command-control"
            ></select2>
          </v-layout>
          <v-layout row wrap
            ><select2
              :options="customerSources"
              :reduce="customerSource => customerSource.id"
              placeholder="Nguồn khách"
              label="name"
              v-model="sourceId"
              class="command-control"
            ></select2>
          </v-layout>
          <v-layout row wrap
            ><v-text-field
              hide-details
              label="Mã cơ hội"
              v-model="code"
              append-icon="search"
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
              v-model="productGroupId"
              class="command-control"
            ></select2>
          </v-layout>
          <v-layout row wrap> </v-layout>
        </v-flex>
        <v-flex xs1 sm1 md1 lg1> </v-flex>
        <v-flex xs12 sm12 md5 lg5>
          <v-layout row wrap>
            <v-text-field
              hide-details
              label="Số điện thoại"
              v-model="phone"
              append-icon="search"
              v-on:keyup="inputSearch"
              :clearable="true"
            ></v-text-field>
          </v-layout>
          <v-layout row wrap
            ><select2
              :options="priorities"
              :reduce="priority => priority.id"
              placeholder="Mức độ khẩn cấp"
              label="name"
              v-model="priorityId"
              class="command-control"
            ></select2>
          </v-layout>
          <v-layout row wrap
            ><select2
              :options="customerGroups"
              :reduce="customerGroup => customerGroup.id"
              placeholder="Nhóm khách hàng"
              label="name"
              v-model="groupId"
              class="command-control"
            ></select2>
          </v-layout>
          <v-layout row wrap>
            <select2
              :options="users"
              :reduce="user => user.id"
              placeholder="Người phụ trách"
              label="name"
              v-model="userId"
              class="command-control"
            ></select2>
          </v-layout>
          <v-layout row wrap>
            <select2
              :options="visits"
              :reduce="c => c.id"
              placeholder="Người phụ trách"
              label="name"
              v-model="visit"
              class="command-control"
            ></select2
          ></v-layout>
          <v-layout row wrap> </v-layout>
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
              <span
                :style="{ background: `${props.item.color}` }"
                style="color:white;padding:5px"
                >{{ props.item.color }}</span
              >
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
      hotline: "",
      address: "",
      table: {
        headers: [
          {
            text: "Trạng thái",
            value: "crm_status",
            align: "center",
            sorable:true
          },
          {
            text: "Mức độ khẩn cấp",
            value: "crm_priority",
            align: "center",
            sorable:true
          },{
            text: "Mã cơ hội",
            value: "code",
            align: "center",
            sorable:true
          },
          {
            text: "Khách hàng",
            value: "customer",
            align: "center"
          },
          {
            text: "Nhu cầu",
            value: "need",
            align: "center"
          },
          {
            text: "Nguồn",
            value: "customer_source",
            align: "center",
            sorable:true
          },
          {
            text: "Phụ trách",
            value: "customer_source",
            align: "center"
          },
          {
            text: "Ngày liên hệ tiếp",
            value: "next_contact_date",
            align: "center",
            sorable:true
          },
          {
            text: "Ngày tạo",
            value: "date_created",
            align: "center",
            sorable:true
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
      name:"",
      phone:"",
      groupId:null,
      sourceId:null,
      code:"",
      priorityId:null,
      statusId:null,
      visit:null,
      userId:null,
      productGroupId:null,
      fromDate:Date,
      toDate:Date,
      users:[],
      customerGroups:[],
      productGroup:[],
      sources:[],
      priorities:[],
      statuses:[],
      visit:[{id:null,name:"Tất cả",id:0,name:"Chưa đến",id:1,name:"Đã đến"}]
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
          let rs = await this.GetList([url.crm.route,{
            Page: page,
            PageSize: rowsPerPage,
            ColumnOrder: sortBy,
            SortDir: descending ? "desc" : "asc",
            customer: this.name,
            customer_phone:this.phone,
            customer_group_id:this.groupId,
            customer_source_id:this.sourceId,
            code=this.code,
            crm_priority_id:this.priorityId,
            crm_status_id:this.statusId,
            product_group_id:this.productGroupId,
            visit:this.visit,
            user_id:this.userId,
            from_date:this.fromDate,
            to_date:this.toDate
          }]);
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
    }
  }
};
</script>

<style>
</style>
