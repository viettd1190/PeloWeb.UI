<template>
  <div>
    <title-page>
    Danh sách người dùng
  </title-page>
  </div>
</template>

<script>
import axios from "axios";
import { stringify } from "querystring";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { log } from "util";
import moment from "moment";
import XLSX from "xlsx";
import TitlePage from "@/components/TitlePage";
export default {
  components: {
    TitlePage
  },
  props: {
    beforeUpload: Function,
    onSuccess: Function
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      "loggedUser"
    ])
  },
  created() {
    if (!this.loggedUser) window.location.href = '#/login';
  },
  mounted() {
  },
  watch: {
  },
  methods: {
    ...mapActions([]),
    ...mapMutations([
    ]),
  }
};
</script>

<style>

</style>
