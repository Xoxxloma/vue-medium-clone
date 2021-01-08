<template>
  <AppLoader v-if="isLoading" />
  <AppErrorMessage v-if="error" />
  <div v-if="tags" class="sidebar">
    <p>Popular Tags</p>
    <div class="tag-list">
      <RouterLink
        v-for="tag in tags"
        :key="tag"
        :to="{ name: 'tag', params: { slug: tag } }"
        class="tag-default tag-pill"
      >
        {{ tag }}
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/tags";
import { mapState } from "vuex";
import AppLoader from "@/components/Loader";
import AppErrorMessage from "@/components/ErrorMessage";
export default {
  name: "AppPopularTags",
  mounted() {
    this.fetchTags();
  },
  components: {
    AppLoader,
    AppErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.tags.isLoading,
      tags: (state) => state.tags.data,
      error: (state) => state.tags.error,
    }),
  },
  methods: {
    fetchTags() {
      return this.$store.dispatch(actionTypes.getTags);
    },
  },
};
</script>
