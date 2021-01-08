<template>
  <div class="spinner-wrap">
    <moon-loader :loading="true" :color="color" :size="size"></moon-loader>
  </div>
</template>

<script>
import MoonLoader from "vue-spinner/src/MoonLoader.vue";
export default {
  name: "AppLoader",
  components: {
    MoonLoader,
  },
  props: {
    color: {
      type: String,
      default: "#5cb85c",
    },
    size: {
      type: String,
      default: "50px",
    },
  },
};
</script>

<style scoped>
  .spinner-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
