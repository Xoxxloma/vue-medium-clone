import tagsAPI from "@/api/tags";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getTagsStarted: "[tags] getTagsStarted",
  getTagsSuccess: "[tags] getTagsSuccess",
  getTagsFailure: "[tags] getTagsFailure",
};

const mutations = {
  [mutationTypes.getTagsStarted](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getTagsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getTagsFailure](state) {
    state.isLoading = false;
  }
};

export const actionTypes = {
  getTags: '[tags] getTags'
}

const actions = {
  [actionTypes.getTags](context) {
    return new Promise(() => {
      context.commit(mutationTypes.getTagsStarted)
      tagsAPI.getPopularTags()
        .then(tags => context.commit(mutationTypes.getTagsSuccess, tags))
        .catch(() => context.commit(mutationTypes.getTagsFailure))
    })
  }
}

export default {
  state,
  actions,
  mutations,
};
