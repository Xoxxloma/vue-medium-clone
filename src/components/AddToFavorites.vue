<template>
  <button
    @click="favToggle"
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavoritedLocal,
      'btn-outline-primary': !isFavoritedLocal,
    }"
  >
    <i class="ion-heart" />
    <span>&nbsp; {{ favoritesCountLocal }}</span>
  </button>
</template>

<script>
import { actionTypes } from "@/store/modules/addToFavorites";
export default {
  name: "AppAddToFavorites",
  props: {
    isFavorite: {
      required: true,
      type: Boolean,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFavoritedLocal: this.isFavorite,
      favoritesCountLocal: this.favoritesCount,
    };
  },
  methods: {
    favToggle() {
      if (this.isFavoritedLocal) {
        this.favoritesCountLocal--;
      } else {
        this.favoritesCountLocal++;
      }
      this.$store.dispatch(actionTypes.addToFav, {
        slug: this.articleSlug,
        isFavorite: this.isFavoritedLocal,
      });
      this.isFavoritedLocal = !this.isFavoritedLocal;
    },
  },
};
</script>
