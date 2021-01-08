<template>
  <div>
    <AppLoader v-if="isLoading" />
    <AppErrorMessage v-if="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <RouterLink
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </RouterLink>
          <div class="info">
            <RouterLink
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
              class="author"
            >
              {{ article.author.username }}
            </RouterLink>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <AppAddToFavorites
              :isFavorite="article.favorited"
              :articleSlug="article.slug"
              :favoritesCount="article.favoritesCount"
            />
          </div>
        </div>
        <RouterLink
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <AppTagList :tags="article.tagList" />
        </RouterLink>
      </div>
      <AppPagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/feed";
import { mapState } from "vuex";
import { limit } from "@/helpers/variables";
import AppPagination from "@/components/Pagination";
import AppLoader from "@/components/Loader";
import AppErrorMessage from "@/components/ErrorMessage";
import AppTagList from "@/components/TagList";
import AppAddToFavorites from "@/components/AddToFavorites";
import { stringify, parseUrl } from "query-string";

export default {
  name: "AppFeedView",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  components: {
    AppPagination,
    AppLoader,
    AppErrorMessage,
    AppTagList,
    AppAddToFavorites,
  },
  mounted() {
    this.fetchFeed();
  },
  data() {
    return {
      limit,
    };
  },
  computed: {
    ...mapState({
      feed: (state) => state.feed.data,
      isLoading: (state) => state.feed.isLoading,
      error: (state) => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
    apiUrl() {
      this.fetchFeed();
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });

      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
  },
};
</script>
