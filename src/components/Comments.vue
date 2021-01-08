<template>
  <form class="card comment-form ng-valid ng-dirty ng-submitted" @submit.prevent="postComment">
    <div class="card-block">
      <textarea
        class="form-control ng-valid ng-dirty ng-touched ng-empty"
        placeholder="Write a comment"
        v-model="comment"
      >
      </textarea>
    </div>
    <div class="card-footer">
      <img :src="currentUser.image" class="comment-author-img" />
      <button class="btn btn-sm btn-primary" type="submit">Add comment</button>
    </div>
  </form>
</template>

<script>
import { actionTypes } from "@/store/modules/comments";
export default {
  name: "AppComments",
  props: {
    currentUser: {
      required: true,
      type: Object,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    postComment() {
      this.$store
        .dispatch(actionTypes.postComment, {
          slug: this.slug,
          commentInput: this.comment,
        })
        .then(() => {
          this.comment = ""
          this.$store.dispatch(actionTypes.fetchComments, {
            slug: this.slug,
          })
        });
    },
  },
};
</script>
