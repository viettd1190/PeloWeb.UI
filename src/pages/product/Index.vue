<template>
  <div style="min-height:400px">
     <title-page>Danh sách khách hàng</title-page>
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
