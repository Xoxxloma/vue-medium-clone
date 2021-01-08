<template>
  <div class="home-page">
    <AppBanner />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <AppFeedToggler />
          <AppFeedView :apiUrl="apiUrl" />
        </div>
        <div class="col-md-3">
          <AppPopularTags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeedView from "@/components/FeedView";
import AppPopularTags from "@/components/PopularTags";
import AppBanner from "@/components/Banner";
import AppFeedToggler from '@/components/FeedToggler'
export default {
  name: "AppYourFeed",
  components: {
    AppFeedView,
    AppPopularTags,
    AppBanner,
    AppFeedToggler
  },
  data() {
    return {
      apiUrl: "/articles/feed",
    };
  },
  mounted() {
    console.log(this.$route)
  }
};
</script>