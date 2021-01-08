import userProfileAPI from "@/api/userProfile";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getUserProfileStarted: "[userProfile] getUserProfileStarted",
  getUserProfileSuccess: "[userProfile] getUserProfileSuccess",
  getUserProfileFailure: "[userProfile] getUserProfileFailure",
};

const mutations = {
  [mutationTypes.getUserProfileStarted](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = false;
  }
};

export const actionTypes = {
  getUserProfile: '[userProfile] getUserProfile'
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise(() => {
      context.commit(mutationTypes.getUserProfileStarted)
      userProfileAPI.getUserProfile(slug)
        .then(user => context.commit(mutationTypes.getUserProfileSuccess, user))
        .catch(() => context.commit(mutationTypes.getUserProfileFailure))
    })
  }
}

export default {
  state,
  actions,
  mutations,
};