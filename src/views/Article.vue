<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <RouterLink
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <i :src="article.author.image" />
          </RouterLink>
          <div class="info">
            <RouterLink
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </RouterLink>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <RouterLink
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit" />
              Edit article
            </RouterLink>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Delete article
            </button>
          </span>
          <span v-else>
            <AppFollowUser
              :username="article.author.username"
              :isFollowing="article.author.following"
            />
            <AppAddToFavoriteInProfile
              :isFavorite="article.favorited"
              :favoritesCount="article.favoritesCount"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <AppLoader v-if="isLoading" />
      <AppErrorMessage v-if="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <AppTagList :tags="article.tagList" />
        </div>
        <hr />
      </div>
      <div class="row">
        <div class="col-md-8 offset-md-2 col-xs-12">
          <AppComments
            v-if="currentUser"
            :currentUser="currentUser"
            :slug="slug"
          />
          <AppCommentsList v-if="comments" :comments="comments" :slug="slug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes as articleActionTypes } from "@/store/modules/article";
import { actionTypes as commentsActionTypes } from "@/store/modules/comments";
import { getterTypes as authGetterTypes } from "@/store/modules/auth";
import { mapState, mapGetters } from "vuex";
import AppLoader from "@/components/Loader";
import AppErrorMessage from "@/components/ErrorMessage";
import AppTagList from "@/components/TagList";
import AppAddToFavoriteInProfile from "@/components/AddToFavoriteInProfile";
import AppFollowUser from "@/components/FollowUser";
import AppComments from "@/components/Comments";
import AppCommentsList from "@/components/CommentsList";
export default {
  name: "AppArticle",
  mounted() {
    this.fetchArticle();
    this.fetchComments();
  },
  components: {
    AppLoader,
    AppErrorMessage,
    AppTagList,
    AppAddToFavoriteInProfile,
    AppFollowUser,
    AppComments,
    AppCommentsList,
  },
  computed: {
    ...mapState({
      article: (state) => state.article.data,
      isLoading: (state) => state.article.isLoading,
      error: (state) => state.article.error,
      comments: (state) => state.comments.data,
    }),
    slug() {
      return this.$route.params.slug;
    },
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username;
    },
  },
  methods: {
    fetchArticle() {
      this.$store.dispatch(articleActionTypes.getArticle, { slug: this.slug });
    },
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, { slug: this.slug })
        .then(() => this.$router.push({ name: "globalFeed" }));
    },
    fetchComments() {
      this.$store
        .dispatch(commentsActionTypes.fetchComments, { slug: this.slug })
        .then((comments) => console.log(comments));
    },
  },
};
</script>
