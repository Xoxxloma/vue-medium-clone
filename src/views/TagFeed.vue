<template>
  <div class="home-page">
    <AppBanner />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <AppFeedToggler :tagName="tagName" />
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
import AppFeedToggler from "@/components/FeedToggler";
export default {
  name: "AppTagFeed",
  components: {
    AppFeedView,
    AppPopularTags,
    AppBanner,
    AppFeedToggler
  },
  computed: {
    tagName() {
      return this.$route.params.slug;
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`;
    },
  },
};
</script>
