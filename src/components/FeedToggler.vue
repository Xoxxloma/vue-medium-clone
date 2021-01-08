<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <RouterLink :to="{ name: 'yourFeed' }" class="nav-link" :class="{active: routeName === 'yourFeed'}">
          Your feed
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :to="{ name: 'globalFeed' }" class="nav-link" :class="{active: routeName === 'globalFeed'}">
          Feed
        </RouterLink>
      </li>
      <li class="nav-item" v-if="tagName">
        <RouterLink :to="{ name: 'tag' }" class="nav-link" :class="{active: routeName === 'tag'}">
          <i class="ion-pound" />
          {{ tagName }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/modules/auth";
export default {
  name: "AppFeedToggler",
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
    }),
    routeName() {
      return this.$route.name
    }
  },
};
</script>
