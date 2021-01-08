import commentsAPI from "@/api/comments";

const state = {
  data: null,
  isLoading: true,
  error: false,
};

const mutationTypes = {
  fetchCommentsStart: "[comments] fetchCommentsStart",
  fetchCommentsSuccess: "[comments] fetchCommentsSuccess",
  fetchCommentsFailure: "[comments] fetchCommentsFailure",

  postCommentStart: "[comments] postCommentStart",
  postCommentSuccess: "[comments] postCommentSuccess",
  postCommentFailure: "[comments] postCommentFailure",

  deleteCommentStart: "[comments] deleteCommentsStart",
  deleteCommentSuccess: "[comments] deleteCommentsSuccess",
  deleteCommentFailure: "[comments] deleteCommentsFailure",
};

export const actionTypes = {
  fetchComments: "[comments] fetchComments",
  postComment: "[comments] postComment",
  deleteComment: "[comments] deleteComment",
};

const mutations = {
  [mutationTypes.fetchCommentsStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.fetchCommentsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.fetchCommentsFailure](state) {
    state.isLoading = false;
  },

  [mutationTypes.postCommentStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.postCommentSuccess](state) {
    state.isLoading = false;
  },
  [mutationTypes.postCommentFailure](state) {
    state.isLoading = false;
  },

  [mutationTypes.deleteCommentStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.deleteCommentSuccess](state) {
    state.isLoading = false;
  },
  [mutationTypes.deleteCommentFailure](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.fetchComments](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.fetchCommentsStart);
      commentsAPI
        .getComments(slug)
        .then((comments) => {
          context.commit(mutationTypes.fetchCommentsSuccess, comments);
          resolve(comments);
        })
        .catch(() => context.commit(mutationTypes.fetchCommentsFailure));
    });
  },
  [actionTypes.postComment](context, { slug, commentInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.postCommentStart);
      commentsAPI
        .postComment(slug, commentInput)
        .then(() => {
          context.commit(mutationTypes.postCommentSuccess);
          resolve();
        })
        .catch(() => context.commit(mutationTypes.postCommentFailure));
    });
  },
  [actionTypes.deleteComment](context, { slug, commentId }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteCommentStart);
      commentsAPI
        .deleteComment(slug, commentId)
        .then(() => {
          context.commit(mutationTypes.deleteCommentSuccess);
          resolve();
        })
        .catch(() => context.commit(mutationTypes.deleteCommentFailure));
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
