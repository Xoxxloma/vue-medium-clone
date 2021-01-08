<template>
  <button class="btn btn-sm btn-primary" @click="favToggle">
    <i class="ion-heart" />
    {{ favoriteButtonText }}
  </button>
</template>

<script>
import { actionTypes } from "@/store/modules/addToFavorites";
export default {
  name: "AppAddToFavoriteInProfile",
  props: {
    isFavorite: {
      type: Boolean,
      requited: true,
    },
    favoritesCount: {
      type: Number,
      requited: true,
    },
  },
  data() {
    return {
      isFavLocal: this.isFavorite,
      favCountLocal: this.favoritesCount,
    };
  },
  computed: {
    favoriteButtonText() {
      const text = this.isFavLocal ? "Unfavorite" : "Favorite";
      return `${text} article (${this.favCountLocal})`;
    },
  },
  methods: {
    favToggle() {
      if (this.isFavLocal) {
        this.favCountLocal--;
      } else {
        this.favCountLocal++;
      }
      this.$store.dispatch(actionTypes.addToFav, {
        slug: this.$route.params.slug,
        isFavorite: this.isFavLocal,
      });
      this.isFavLocal = !this.isFavLocal;
    },
  },
};
</script>
