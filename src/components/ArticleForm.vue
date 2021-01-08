<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <AppValidationErrors v-if="errors" :validationErrors="errors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Description"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="Article about"
                  v-model="body"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Tags"
                  v-model="tagList"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-lg btn-primary pull-xs-right"
                  :disabled="isSubmitting"
                >
                  Publush article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from "@/components/ValidationErrors";
export default {
  name: "AppArticleForm",
  components: {
    AppValidationErrors,
  },
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(" "),
    };
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(" ")
      };
      this.$emit("onSubmit", form);
    },
  },
};
</script>
