import { mutationTypes as authMutationsTypes } from "@/store/modules/auth";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

const mutations = {
  [authMutationsTypes.updateCurrentUserStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [authMutationsTypes.updateCurrentUserSuccess](state) {
    state.isSubmitting = false;
  },
  [authMutationsTypes.updateCurrentUserFailure](state, payload) {
    state.validationErrors = payload;
    state.isSubmitting = false;
  },
};

export default {
  state,
  mutations
}