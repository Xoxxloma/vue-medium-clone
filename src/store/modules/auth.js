import authAPI from "@/api/auth";
import persister from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: "[auth] registerStart",
  registerSuccess: "[auth] registerSuccess",
  registerFailure: "[auth] registerFailure",

  loginStart: "[auth] loginStart",
  loginSuccess: "[auth] loginSuccess",
  loginFailure: "[auth] loginFailure",

  getCurrentUserStart: "[auth] getCurrentUserStart",
  getCurrentUserSuccess: "[auth] getCurrentUserSuccess",
  getCurrentUserFailure: "[auth] getCurrentUserFailure",

  updateCurrentUserStart: "[auth] updateCurrentUserStart",
  updateCurrentUserSuccess: "[auth] updateCurrentUserSuccess",
  updateCurrentUserFailure: "[auth] updateCurrentUserFailure",

  logout: "[auth] logout"
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.isLoading = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.isLoading = false;
    state.validationErrors = payload;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.isLoading = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isLoading = false;
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
  },
  [mutationTypes.updateCurrentUserFailure]() {},
  [mutationTypes.logout](state) {
    state.currentUser = null,
    state.isLoggedIn = false
  }
};

export const actionTypes = {
  register: "[auth] register",
  login: "[auth] login",
  getCurrentUser: "[auth] getCurrentUser",
  updateCurrentUser: "[auth] updateCurrentUser",
  logout: "[auth] logout",
};

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous",
};

const getters = {
  [getterTypes.currentUser]: (state) => state.currentUser,
  [getterTypes.isLoggedIn]: (state) => Boolean(state.isLoggedIn),
  [getterTypes.isAnonymous]: (state) => state.isLoggedIn === false,
};

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart);
      authAPI
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          persister.setItem("jwtToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((e) => {
          context.commit(mutationTypes.registerFailure, e.response.data.errors);
        });
    });
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);
      authAPI
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          persister.setItem("jwtToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((e) => {
          context.commit(mutationTypes.loginFailure, e.response.data.errors);
        });
    });
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart);
      authAPI
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          );
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },
  [actionTypes.updateCurrentUser](context, { currentUserInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateCurrentUserStart);
      authAPI
        .updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit(mutationTypes.updateCurrentUserSuccess, user);
          resolve(user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateCurrentUserFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      persister.setItem('jwtToken', "")
      context.commit(mutationTypes.logout)
      resolve()
    })
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
