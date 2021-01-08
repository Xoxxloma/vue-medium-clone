<template>
  <div>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <RouterLink
          class="comment-author"
          :to="{
            name: 'userProfile',
            params: { slug: comment.author.username },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </RouterLink>
        &nbsp;
        <RouterLink
          class="comment-author"
          :to="{
            name: 'userProfile',
            params: { slug: comment.author.username },
          }"
        >
          {{ comment.author.username }}
        </RouterLink>
        <span class="mod-options" @click="deletePost(comment.id)">
          <i class="ion-trash-a" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/comments";
export default {
  name: "AppCommentsList",
  props: {
    comments: {
      type: Array,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  methods: {
    deletePost(commentId) {
      this.$store
        .dispatch(actionTypes.deleteComment, {
          slug: this.slug,
          commentId,
        })
        .then(() =>
          this.$store.dispatch(actionTypes.fetchComments, { slug: this.slug })
        );
    },
  },
};
</script>
