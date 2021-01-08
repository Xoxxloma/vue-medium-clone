import followUserAPI from "@/api/followUser";

const mutationsTypes = {
  followUserStart: "[followUser] followUserStart",
  followUserSuccess: "[followUser] followUserSuccess",
  followUserFailure: "[followUser] followUserFailure",
};

export const actionTypes = {
  followUser: "[followUser] followUser",
};

const mutations = {
  [mutationsTypes.followUserStart]() {},
  [mutationsTypes.followUserSuccess]() {},
  [mutationsTypes.followUserFailure]() {},
};

const actions = {
  [actionTypes.followUser](context, { slug, isFollowing }) {
    return new Promise((resolve) => {
      context.commit(mutationsTypes.followUserStart);
      const promise = isFollowing
        ? followUserAPI.followUser(slug)
        : followUserAPI.unfollowUser(slug);
      promise
        .then((profile) => {
          context.commit(mutationsTypes.followUserSuccess, profile);
          resolve(profile);
        })
        .catch(() => context.commit(mutationsTypes.followUserFailure));
    });
  },
};

export default {
  actions,
  mutations
}