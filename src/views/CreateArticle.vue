<template>
  <div class="wrap">
    <h1>Create Article</h1>
  </div>
  <AppArticleForm
    :initialValues="initialValues"
    :errors="validationErrors"
    :isSubmitting="isSubmitting"
    @onSubmit="onSubmit"
  />
</template>

<script>
import AppArticleForm from "@/components/ArticleForm";
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/createArticle";
export default {
  name: "AppCreateArticle",
  components: {
    AppArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  methods: {
    onSubmit(formInput) {
      this.$store
        .dispatch(actionTypes.createArticle, { formInput })
        .then((article) =>
          this.$router.push({ name: "article", params: { slug: article.slug } })
        );
    },
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationErrors: (state) => state.createArticle.validationErrors,
    }),
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
