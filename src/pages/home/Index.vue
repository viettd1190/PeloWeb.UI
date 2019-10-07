<template>
  <div>
  </div>
</template>

<script>
import axios from "axios";
import { stringify } from "querystring";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { log } from "util";
import moment from "moment";
import XLSX from "xlsx";
export default {
  components: {
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
