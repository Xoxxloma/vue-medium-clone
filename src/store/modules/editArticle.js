import articleAPI from "@/api/article";

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const mutationTypes = {
  editArticleStart: "[editArticle] editArticleStart",
  editArticleSuccess: "[editArticle] editArticleSuccess",
  editArticleFailure: "[editArticle] editArticleFailure",

  getArticleStart: "[editArticle] getArticleStart",
  getArticleSuccess: "[editArticle] getArticleSuccess",
  getArticleFailure: "[editArticle] getArticleFailure",
};

export const actionTypes = {
  editArticle: "[editArticle] editArticle",
  getArticle: "[editArticle] getArticle",
};

const mutations = {
  [mutationTypes.editArticleStart](state) {
    state.isSubmitting = true,
    state.validationErrors = null;
  },
  [mutationTypes.editArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.editArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.article = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.editArticle](context, { formInput, slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.editArticleStart);
      articleAPI
        .updateArticle(slug, formInput)
        .then((article) => {
          context.commit(mutationTypes.editArticleSuccess);
          resolve(article);
        })
        .catch((err) =>
          context.commit(
            mutationTypes.editArticleFailure,
            err.response.data.errors
          )
        );
    });
  },
  [actionTypes.getArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart);
      articleAPI
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => context.commit(mutationTypes.getArticleFailure));
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
