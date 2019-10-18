<template>
  <v-dialog v-model="dialog" :max-width="300" @keydown.esc="cancel" @input="cancel">
    <v-card>
      <v-toolbar dark color="red" dense flat>
        <v-toolbar-title class="white--text">Xác nhận</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-4">Bạn có chắc muốn xóa thông tin này?</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn text @click.native="cancel">Không</v-btn>
        <v-btn color="red darken-1" class="white--text" text @click.native="agree">Có</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props:{

  },
  data: () => ({
    dialog: true,
  }),
  methods: {
    agree() {
      this.$emit("comfirm", true);
    },
    cancel() {
      this.$emit("comfirm", false);
    }
  }
}
</script>