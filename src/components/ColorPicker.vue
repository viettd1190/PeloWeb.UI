<template>
  <div>
    <v-layout row justify-center>
      <v-card-title primary-title>Màu sắc</v-card-title>
    </v-layout>
    <color-picker
      :color="color"
      :sucker-hide="false"
      :sucker-canvas="suckerCanvas"
      :sucker-area="suckerArea"
      @changeColor="changeColor"
      @openSucker="openSucker"
    />
  </div>
</template>

<script>
import colorPicker from "@caohenghu/vue-colorpicker";
export default {
  props: { selectColor: "" },
  components: {
    colorPicker
  },
  data() {
    return {
      color: this.restoreColor(),
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false
    };
  },
  created() {
    this.restoreColor();
  },
  watch: {
    selectColor() {
      if (this.selectColor != "") {
        this.color = this.selectColor;
      }
    }
  },
  methods: {
    changeColor(color) {
      this.color = this.rGBToHex(color.rgba);
      this.$emit("updateColor", this.color);
    },
    rGBToHex(rgba) {
      let r = rgba.r.toString(16);
      let g = rgba.g.toString(16);
      let b = rgba.b.toString(16);
      let a = Math.round(rgba.a * 255).toString(16);

      if (r.length == 1) r = "0" + r;
      if (g.length == 1) g = "0" + g;
      if (b.length == 1) b = "0" + b;
      if (a.length == 1) a = "0" + a;

      return "#" + r + g + b + a;
    },
    openSucker(isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    },
    restoreColor() {
      this.color = this.selectColor;
    }
  }
};
</script>