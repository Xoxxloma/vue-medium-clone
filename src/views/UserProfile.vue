<template>
  <AppLoader v-if="isLoading" />
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" />
            <h4>{{ userProfile.userName }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              Follow
              <RouterLink
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                Edit profile settings
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <RouterLink
                  class="nav-link"
                  :class="{ active: routeName === 'userProfile' }"
                  :to="{
                    name: 'userProfile',
                    params: { slug: userProfile.username },
                  }"
                >
                  My Feed
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink
                  class="nav-link"
                  :class="{ active: routeName === 'userProfileFavorites' }"
                  :to="{
                    name: 'userProfileFavorites',
                    params: { slug: userProfile.username },
                  }"
                >
                  Favorites
                </RouterLink>
              </li>
            </ul>
          </div>
          <AppFeedView :apiUrl="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/userProfile";
import { getterTypes as authGetterTypes } from "@/store/modules/auth";
import { mapGetters, mapState } from "vuex";
import AppLoader from "@/components/Loader";
import AppFeedView from "@/components/FeedView";
export default {
  name: "AppUserProfile",
  mounted() {
    this.getUser();
  },
  components: {
    AppLoader,
    AppFeedView,
  },
  watch: {
    slug() {
      this.getUser()
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    ...mapState({
      userProfile: (state) => state.userProfile.data,
      isLoading: (state) => state.userProfile.isLoading,
      error: (state) => state.userProfile.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }
      return this.currentUser.username === this.userProfile.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes("favorites");
      return isFavorites
        ? `articles?favorited=${this.slug}`
        : `articles?author=${this.slug}`;
    },
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    getUser() {
      this.$store.dispatch(actionTypes.getUserProfile, { slug: this.slug });
    },
  },
};
</script>
