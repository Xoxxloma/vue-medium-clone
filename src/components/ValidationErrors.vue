<template>
  <ul class="error-messages">
    <li class="error-message" v-for="message in errorMessages" :key="message">
      {{ message }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppValidationErrors",
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(
        (name) => `${name} ${this.validationErrors[name].join(", ")}`
      );
    },
  },
};
</script>
