<template>
  <div class="wrap">
    <h1>Edit Article</h1>
  </div>
  <AppLoader v-if="isLoading" />
  <AppArticleForm
    v-if="initialValues"
    :initialValues="initialValues"
    :errors="validationErrors"
    :isSubmitting="isSubmitting"
    @onSubmit="onSubmit"
  />
</template>

<script>
import AppArticleForm from "@/components/ArticleForm";
import AppLoader from "@/components/Loader";
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/editArticle";
export default {
  name: "AppEditArticle",
  components: {
    AppArticleForm,
    AppLoader,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
  methods: {
    onSubmit(formInput) {
      this.$store
        .dispatch(actionTypes.editArticle, {
          formInput,
          slug: this.$route.params.slug,
        })
        .then((article) =>
          this.$router.push({ name: "article", params: { slug: article.slug } })
        );
    },
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      validationErrors: (state) => state.editArticle.validationErrors,
      article: (state) => state.editArticle.article,
      isLoading: (state) => state.editArticle.isLoading,
    }),
    initialValues() {
      if (!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
};
</script>

<style scoped>
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
