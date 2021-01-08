import axios from "./axios";

const followUser = (slug) =>
  axios.post(`/profiles/${slug}/follow`).then((res) => res.data.profile);

const unfollowUser = (slug) =>
  axios.delete(`/profiles/${slug}/follow`).then((res) => res.data.profile);

export default {
  followUser,
  unfollowUser,
};
