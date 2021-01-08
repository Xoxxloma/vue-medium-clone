import addToFavoritesAPI from "@/api/addToFavorites";

const mutationsTypes = {
  addToFavStart: "[addToFav] addToFavStart",
  addToFavSuccess: "[addToFav] addToFavSuccess",
  addToFavFailure: "[addToFav] addToFavFailure",
};

export const actionTypes = {
  addToFav: "[addToFav] addToFav",
};

const mutations = {
  [mutationsTypes.addToFavStart]() {},
  [mutationsTypes.addToFavSuccess]() {},
  [mutationsTypes.addToFavFailure]() {},
};

const actions = {
  [actionTypes.addToFav](context, { slug, isFavorite }) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.addToFavStart);
      const promise = isFavorite
        ? addToFavoritesAPI.removeFromFavorites(slug)
        : addToFavoritesAPI.addToFavorites(slug);
      promise
        .then((article) => {
          context.commit(mutationsTypes.addToFavSuccess, article);
          resolve(article);
        })
        .catch(() => context.commit(mutationsTypes.addToFavFailure));
    });
  },
};

export default {
  actions,
  mutations
}
