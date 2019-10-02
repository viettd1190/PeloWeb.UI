<template>
    <v-toolbar flat color="transparent" height="50">
        <h3>
            <v-btn flat fab small color="primary" class="link-button" @click="back">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            {{title}}
        </h3>
    </v-toolbar>
</template>
<script>
export default {
  name: 'app-bar',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back: _ => window.getApp.$emit('APP_PAGE_BACK')
  }
};
</script>
