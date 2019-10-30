<template>
  <div style="min-height:400px">
    <title-page>Customer Relationship Management</title-page>
    <v-container>
      <v-expansion-panel expand v-model="panel" :readonly="readonly">
        <v-expansion-panel-content>
          <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg6>
              <v-layout row wrap>
                <v-text-field
                  label="Mã khách hàng"
                  hide-details
                  v-model="customer_code"
                  v-on:keyup="inputSearch"
                  :clearable="true"
                ></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-text-field
                  label="Tên khách hàng"
                  hide-details
                  v-model="customer"
                  v-on:keyup="inputSearch"
                  :clearable="true"
                ></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-text-field
                  hide-details
                  label="Số điện thoại"
                  v-model="customer_phone"
                  v-on:keyup="inputSearch"
                  :clearable="true"
                ></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-text-field
                  hide-details
                  label="Địa chỉ"
                  v-model="customer_address"
                  v-on:keyup="inputSearch"
                  :clearable="true"
                ></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-text-field
                  hide-details
                  label="Nhu cầu"
                  v-model="need"
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
                  v-model="crm_status_id"
                  class="command-control"
                ></select2>
              </v-layout>
              <v-layout row wrap
                ><select2
                  :options="customerSources"
                  :reduce="customerSource => customerSource.id"
                  placeholder="Nguồn khách"
                  label="name"
                  v-model="customer_source_id"
                  class="command-control"
                ></select2>
              </v-layout>
              <v-layout row wrap
                ><v-text-field
                  hide-details
                  label="Mã cơ hội"
                  v-model="code"
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
                  label="Ngày liên hệ từ"
                  v-model="from_date"
                  v-on:keyup="inputSearch"
                  :clearable="true"
                ></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <select2
                  :options="users"
                  :reduce="createUser => createUser.id"
                  placeholder="Người tạo"
                  label="name"
                  v-model="user_created_id"
                  class="command-control"
                ></select2>
              </v-layout>
            </v-flex>
            <v-flex xs1 sm1 md1 lg1> </v-flex>
            <v-flex xs12 sm12 md5 lg5>
              <v-layout row wrap
                ><select2
                  :options="customerGroups"
                  :reduce="customerGroup => customerGroup.id"
                  placeholder="Nhóm khách hàng"
                  label="name"
                  v-model="customer_group_id"
                  class="command-control"
                ></select2>
              </v-layout>
              <v-layout row wrap
                ><select2
                  :options="provinces"
                  :reduce="province => province.id"
                  placeholder="Tỉnh thành"
                  label="name"
                  v-model="province_id"
                  class="command-control"
                ></select2>
              </v-layout>
              <v-layout row wrap>
                <select2
                  :options="districts"
                  :reduce="district => district.id"
                  placeholder="Quận"
                  label="name"
                  v-model="district_id"
                  class="command-control"
                ></select2>
              </v-layout>
              <v-layout row wrap
                ><select2
                  :options="wards"
                  :reduce="ward => ward.id"
                  placeholder="Xã phường"
                  label="name"
                  v-model="ward_id"
                  class="command-control"
                ></select2>
              </v-layout>
              <v-layout row wrap
                ><select2
                  :options="types"
                  :reduce="type => type.id"
                  placeholder="Kiểu chốt"
                  label="name"
                  v-model="crm_type_id"
                  class="command-control"
                ></select2>
              </v-layout>
              <v-layout row wrap
                ><select2
                  :options="priorities"
                  :reduce="priority => priority.id"
                  placeholder="Mức độ khẩn cấp"
                  label="name"
                  v-model="crm_priority_id"
                  class="command-control"
                ></select2>
              </v-layout>
              <v-layout row wrap>
                <select2
                  :options="users"
                  :reduce="user => user.id"
                  placeholder="Người phụ trách"
                  label="name"
                  v-model="user_id"
                  class="command-control"
                ></select2>
              </v-layout>
              <v-layout row wrap>
                <select2
                  :options="visits"
                  :reduce="visit => visit.id"
                  placeholder="Đến cửa hàng"
                  label="name"
                  v-model="visit"
                  class="command-control"
                ></select2
              ></v-layout>
              <v-layout row wrap>
                <v-text-field
                  hide-details
                  label="Ngày liên hệ đến"
                  v-model="to_date"
                  v-on:keyup="inputSearch"
                  :clearable="true"
                ></v-text-field>
              </v-layout>
              <v-layout row wrap>
                <v-text-field
                  hide-details
                  label="Ngày tạo"
                  v-model="date_created"
                  v-on:keyup="inputSearch"
                  :clearable="true"
                ></v-text-field>
              </v-layout>
              <v-layout row wrap> </v-layout>
            </v-flex>
          </v-layout>
          <!-- <template v-slot:header
            ><span></span>
          </template> -->
        </v-expansion-panel-content>
        <v-btn @click="expanse()"
          ><v-icon>{{ icon }}</v-icon></v-btn
        >
      </v-expansion-panel>
      <v-layout row class="row-command">
        <v-btn color="#666EE8" class="white--text" @click="search()">
          <v-icon>sort</v-icon>Lọc
        </v-btn>
        <v-btn color="orange" class="white--text" @click="add()">
          <v-icon>add</v-icon>Thêm cơ hội bán hàng
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
            <td nowrap>
              <v-layout
                justify-center
                class="white--text mark-content"
                :style="{ background: props.item.crm_status_color }"
                wrap
                >{{ props.item.crm_status }}</v-layout
              >
            </td>
            <td nowrap justify-center>
              <v-layout
                justify-center
                class="white--text mark-content"
                :style="{ background: props.item.crm_priority_color }"
                wrap
                >{{ props.item.crm_priority }}</v-layout
              >
            </td>
            <td nowrap style="cursor:pointer" @click="select(props.item)">
              <v-layout justify-center
                ><a>{{ props.item.code }}</a></v-layout
              >
            </td>
            <td nowrap>
              <v-layout>{{ props.item.customer }}</v-layout>
              <v-layout
                ><a
                  style="text-decoration: none;"
                  :href="`tel:${props.item.customer_phone}`"
                  >{{ props.item.customer_phone }}</a
                ></v-layout
              >
              <v-layout style="text-transform:capitalize;">{{
                props.item.customer_address
              }}</v-layout>
              <v-layout
                >Nhóm khách hàng: &nbsp;
                <p class="darken-4">
                  {{ props.item.customer_group }}
                </p></v-layout
              >
            </td>
            <td nowrap>
              <v-layout
                >Nhu cầu: &nbsp;
                <p class="darken-4">{{ props.item.need }}</p></v-layout
              >
            </td>
            <td nowrap>
              <v-layout>{{ props.item.customer_source }}</v-layout>
            </td>
            <td><v-layout wrap> </v-layout></td>
            <td nowrap>
              <v-layout>{{
                formatDate(props.item.contact_date)
              }}</v-layout>
            </td>
            <td nowrap>
              <v-layout>{{ formatDate(props.item.date_created) }}</v-layout>
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
      panel: [false],
      disabled: false,
      readonly: false,
      icon: "arrow_drop_down",
      table: {
        headers: [
          {
            text: "Trạng thái",
            value: "crm_status",
            sorable: true,
            class: "blue--text text--lighten-1"
          },
          {
            text: "Mức độ khẩn cấp",
            value: "crm_priority",
            align: "center",
            sorable: true,
            class: "blue--text text--lighten-1"
          },
          {
            text: "Mã cơ hội",
            value: "code",
            align: "center",
            sorable: true,
            class: "blue--text text--lighten-1"
          },
          {
            text: "Khách hàng",
            value: "customer"
          },
          {
            text: "Nhu cầu",
            value: "need",
            align: "center"
          },
          {
            text: "Nguồn khách hàng",
            value: "customer_source",
            align: "center",
            sorable: true,
            class: "blue--text text--lighten-1"
          },
          {
            text: "Phụ trách",
            value: "customer_source",
            align: "center"
          },
          {
            text: "Ngày liên hệ tiếp",
            value: "contact_date",
            align: "center",
            sorable: true,
            class: "blue--text text--lighten-1"
          },
          {
            text: "Ngày tạo",
            value: "date_created",
            align: "center",
            sorable: true,
            class: "blue--text text--lighten-1"
          }
        ]
      },
      pagination: {
        page: 1,
        itemsPerPage: 10,
        rowsPerPage: 10,
        totalRecords: 0,
        sortBy: "date_created",
        descending: true
      },
      datasourceFiltered: [],
      isLoading: -1,
      customer: "",
      customer_code: "",
      customer_address: "",
      province_id: null,
      district_id: null,
      ward_id: null,
      need: "",
      crm_type_id: null,
      customer_phone: "",
      customer_group_id: null,
      customer_source_id: null,
      code: "",
      crm_priority_id: null,
      crm_status_id: null,
      product_group_id: null,
      visit: -1,
      user_created_id: null,
      user_id: null,
      date_created: null,
      from_date: null,
      to_date: null,
      users: [],
      customerGroups: [],
      customerSources: [],
      productGroups: [],
      priorities: [],
      cmrStatuses: [],
      selectDistricts: [],
      selectWards: [],
      visits: [
        { id: -1, name: "Tất cả" },
        { id: 0, name: "Chưa đến" },
        { id: 1, name: "Đã đến" }
      ],
      types: []
    };
  },
  computed: {
    ...mapGetters(["provinces", "districts", "wards"])
  },
  created() {},
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
    province_id() {
      this.changeProvince();
    },
    district_id() {
      this.changeDistrict();
    }
  },
  methods: {
    ...mapActions(["GetList","GetAll"]),
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
            url.crm.route,
            {
              Page: page,
              PageSize: rowsPerPage,
              ColumnOrder: sortBy,
              SortDir: descending ? "desc" : "asc",
              customer: this.customer,
              customer_code: this.customer_code,
              province_id: this.province_id,
              district_id: this.district_id,
              ward_id: this.ward_id,
              customer_address: this.customer_address,
              need: this.need,
              crm_type_id: this.crm_type_id,
              customer_phone: this.customer_phone,
              customer_group_id: this.customer_group_id,
              customer_source_id: this.customer_source_id,
              code: this.code,
              crm_priority_id: this.crm_priority_id,
              crm_status_id: this.crm_status_id,
              product_group_id: this.product_group_id,
              visit: this.visit,
              user_id: this.user_id,
              user_created_id: this.user_created_id,
              from_date: this.from_date,
              to_date: this.to_date,
              date_created: this.date_created
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
    expanse() {
      //this.panel[0] = !this.panel[0];
      if (this.panel[0]) {
        this.panel = [false];
        this.icon = "arrow_drop_down";
      } else {
        this.panel = [true];
        this.icon = "arrow_drop_up";
      }
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style>
.mark-content {
  width: fit-content;
  padding: 5px;
}
</style>
