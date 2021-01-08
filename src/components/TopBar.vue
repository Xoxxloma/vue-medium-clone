<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'globalFeed' }">
        Pepega
      </RouterLink>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <RouterLink
            class="nav-link"
            :to="{ name: 'globalFeed' }"
            active-class="active"
            exact
          >
            Home
          </RouterLink>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :to="{ name: 'createArticle' }"
              active-class="active"
            >
              <i class="ion-compose" /> &nbsp; New article
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :to="{ name: 'settings' }"
              active-class="active"
            >
              <i class="ion-gear-a" /> &nbsp; Settings
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              :to="{
                name: 'userProfile',
                params: { slug: currentUser.username },
              }"
            >
              <img class="user-pic" :src="currentUser.image" /> &nbsp;
              {{ currentUser.username }}
            </RouterLink>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :to="{ name: 'login' }"
              active-class="active"
            >
              Sign In
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              :to="{ name: 'register' }"
              active-class="active"
            >
              Sign Up
            </RouterLink>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { getterTypes } from "@/store/modules/auth";
import { mapGetters } from 'vuex'; 
export default {
  name: "AppTopBar",
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    })
  },
};
</script>
