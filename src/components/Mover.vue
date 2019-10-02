<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <v-card>
          <v-toolbar card color="white">
            <h4>{{leftTitle}} ({{leftDatasource.length}})</h4>
            <v-spacer></v-spacer>
            <v-text-field
              solo
              flat
              hide-details
              append-icon="search"
              placeholder="Tìm trên danh sách này"
              v-model="searchText"
            ></v-text-field>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
              <v-list>
                <template v-for="(item, index) in leftDatasource">
                  <v-list-tile :key="item.id" avatar ripple>
                    <v-list-tile-content>
                      <v-list-tile-title>{{item[firstLineProp]}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{item[secondLineProp]}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon color="green" @click="moveRight(item.id)">arrow_forward</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider v-if="item != leftDatasource.length" :key="index"></v-divider>
                </template>
              </v-list>
            </vue-perfect-scrollbar>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6 lg6 xl6>
        <v-card>
          <v-toolbar card color="white">
            <h4>{{rightTitle}} ({{rightDatasource.length}})</h4>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
              <v-list>
                <template v-for="(item, index) in rightDatasource">
                  <v-list-tile :key="item.id" avatar ripple>
                    <v-list-tile-avatar>
                      <v-icon color="red" @click="moveLeft(item.id)">arrow_back</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{item[firstLineProp]}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{item[secondLineProp]}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-if="item != rightDatasource.length" :key="index"></v-divider>
                </template>
              </v-list>
            </vue-perfect-scrollbar>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  name: 'mover',
  components: {
    VuePerfectScrollbar
  },
  props: {
    leftTitle: {
      type: String,
      default: ''
    },
    rightTitle: {
      type: String,
      default: ''
    },
    datasource: {
      type: Array,
      default: []
    },
    firstLineProp: {
      type: String,
      default: ''
    },
    secondLineProp: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      scrollSettings: {
        maxScrollbarLength: 160
      },
      searchText: '',
      leftDatasource: this.datasource,
      rightDatasource: []
    };
  },
  watch: {
    datasource () {
      this.leftDatasource = this.datasource;
    },
    searchText () {
      let unSelected = this.datasource;

      this.rightDatasource.map(a => {
        let index = unSelected.indexOf(a);
        if (index !== -1) unSelected.splice(index, 1);
        return 0;
      });
      if (this.searchText === '') {
        this.leftDatasource = unSelected;
      } else {
        let filtered = unSelected.filter(a =>
          `${(a[this.firstLineProp] ? a[this.firstLineProp] : '').toUpperCase()}
            ${(a[this.secondLineProp]
    ? a[this.secondLineProp]
    : ''
  ).toUpperCase()}
          `.includes(this.searchText.toUpperCase())
        );
        this.leftDatasource = filtered;
      }
    },
    rightDatasource () {
      this.$emit('output', this.rightDatasource);
    }
  },
  methods: {
    moveRight (deviceId) {
      let device = this.leftDatasource.filter(a => a.id === deviceId)[0];
      if (device) {
        this.rightDatasource.push(device);
        let index = this.leftDatasource.indexOf(device);
        if (index !== -1) this.leftDatasource.splice(index, 1);
      }
    },
    moveLeft (deviceId) {
      let device = this.rightDatasource.filter(a => a.id === deviceId)[0];
      if (device) {
        this.leftDatasource.push(device);
        let index = this.rightDatasource.indexOf(device);
        if (index !== -1) this.rightDatasource.splice(index, 1);
      }
    }
  }
};
</script>
<style scoped>
.drawer-menu--scroll {
  height: 40vh;
  overflow: auto;
}
</style>
