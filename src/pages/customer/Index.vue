<template>
  <div style="min-height:400px">
    <title-page>Danh sách khách hàng</title-page>
    <v-container>
      <v-layout row justify-center>
        <v-flex md6 lg6>
          <v-text-field
            hide-details
            label="Tên"
            v-model="name"
            v-on:keyup="inputSearch"
            :clearable="true"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 sm1 md1 lg1></v-flex>
        <v-flex md6 lg6>
          <v-select
            :items="provinces"
            item-text="name"
            item-value="id"
            v-model="province"
            label="Tỉnh thành"
            persistent-hint
            return-object
            :clearable="true"
            v-on:change="changeProvince"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex md6 lg6>
          <v-text-field
            hide-details
            label="Điện thoại"
            v-model="phone"
            v-on:keyup="inputSearch"
            :clearable="true"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 sm1 md1 lg1></v-flex>
        <v-flex md6 lg6>
          <v-select
            :items="selectDistricts"
            item-text="name"
            item-value="id"
            v-model="district"
            label="Quận Huyện"
            persistent-hint
            return-object
            :clearable="true"
            v-on:change="changeDistrict"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex md6 lg6>
          <v-text-field
            hide-details
            label="Địa chỉ"
            v-model="address"
            v-on:keyup="inputSearch"
            :clearable="true"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 sm1 md1 lg1></v-flex>
        <v-flex md6 lg6>
          <v-select
            :items="selectWards"
            item-text="name"
            item-value="id"
            v-model="ward"
            label="Xã phường"
            persistent-hint
            return-object
            :clearable="true"
          ></v-select>
        </v-flex>
      </v-layout>
      <!-- <v-layout row justify-center>
        <v-flex md6 lg6>
          <v-text-field
            hide-details
            label="Ghi chú"
            v-model="description"
            v-on:keyup="inputSearch"
            :clearable="true"
          ></v-text-field>
        </v-flex>
        <v-flex xs1 sm1 md1 lg1></v-flex>
        <v-flex md6 lg6>
        </v-flex>
      </v-layout> -->
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
            <td nowrap>{{ props.item.phone }}</td>
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
      name: "",
      phone: "",
      address: "",
      table: {
        headers: [
          {
            text: "Tên",
            value: "name",
            align: "center"
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
      ward: { id: 0, name: "", type: "" }
    };
  },
  computed: {...mapGetters(["provinces", "districts", "wards"])},
  created() {this.syncSelect();},
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
    }
  },
  methods: {
    ...mapActions(["GetList","GetDistricts","GetWards"]),
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
              ProvinceId: this.province.id,
              DistrictId: this.district.id,
              WardId: this.ward.id,
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
      this.GetDistricts({ ProvinceId: this.province.id });
      this.GetWards({
        ProvinceId: this.province.id,
        DistrictId: this.district.id
      });
    },
    changeProvince(e) {
      if (e == undefined) {
        this.province = { id: 0, name: "" };
      }
      this.GetDistricts({ ProvinceId: this.province.id });
      this.selectWards = [];
      this.GetWards({ ProvinceId: this.province.id, DistrictId: 0 });
    },
    changeDistrict(e) {
      if (e == undefined) {
        this.district = { id: 0, name: "" };
      }
      this.GetWards({
        ProvinceId: this.province != undefined ? this.province.id : 0,
        DistrictId: e.id
      });
    }
  }
};
</script>

<style>
</style>
