<template>
  <button
    class="btn btn-sm action-btn ng-binding btn-secondary"
    @click="toggleFollow"
  >
    <i class="ion-plus-round" />
    {{ followButtonText }}
  </button>
</template>

<script>
import { actionTypes } from "@/store/modules/followUser";
export default {
  name: "AppFollowUser",
  props: {
    isFollowing: {
      type: Boolean,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFollowed: this.isFollowing,
    };
  },
  computed: {
    followButtonText() {
      const text = this.isFollowed ? "Unfollow" : "Follow";
      return `${text} ${this.username}`;
    },
  },
  methods: {
    toggleFollow() {
      this.$store.dispatch(actionTypes.followUser, {
        slug: this.username,
        isFollowing: this.isFollowed,
      });
      this.isFollowed = !this.isFollowed;
    },
  },
};
</script>
