import articleAPI from "@/api/article";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleStarted: "[article] getArticleStarted",
  getArticleSuccess: "[article] getArticleSuccess",
  getArticleFailure: "[article] getArticleFailure",

  deleteArticleStarted: "[article] deleteArticleStarted",
  deleteArticleSuccess: "[article] deleteArticleSuccess",
  deleteArticleFailure: "[article] deleteArticleFailure",
};

const mutations = {
  [mutationTypes.getArticleStarted](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
  [mutationTypes.deleteArticleStarted](state) {
    state.isLoading = true;
  },
  [mutationTypes.deleteArticleSuccess](state) {
    state.isLoading = false;
    state.data = null;
  },
  [mutationTypes.deleteArticleFailure](state) {
    state.isLoading = false;
  },
};

export const actionTypes = {
  getArticle: "[article] getArticle",
  deleteArticle: "[article] deleteArticle",
};

const actions = {
  [actionTypes.getArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStarted);
      articleAPI
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => context.commit(mutationTypes.getArticleFailure));
    });
  },
  [actionTypes.deleteArticle](context, { slug }) {
    return new Promise((res) => {
      context.commit(mutationTypes.deleteArticleStarted);
      articleAPI
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess)
          res()
        })
        .catch(() => context.commit(mutationTypes.deleteArticleFailure));
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
