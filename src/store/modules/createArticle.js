import articleAPI from "@/api/article";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createArticleStart: "[createArticle] createArticleStart",
  createArticleSuccess: "[createArticle] createArticleSuccess",
  createArticleFailure: "[createArticle] createArticleFailure",
};

export const actionTypes = {
  createArticle: "[createArticle] createArticle",
};

const mutations = {
  [mutationTypes.createArticleStart](state) {
    (state.isSubmitting = true), (state.validationErrors = null);
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.createArticle](context, { formInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.createArticleStart);
      articleAPI
        .createArticle(formInput)
        .then((article) => {
          context.commit(mutationTypes.createArticleSuccess);
          resolve(article);
        })
        .catch((err) =>
          context.commit(
            mutationTypes.createArticleFailure,
            err.response.data.errors
          )
        );
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
