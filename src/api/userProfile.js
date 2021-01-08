import axios from "./axios";

const getUserProfile = (slug) =>
  axios.get(`/profiles/${slug}`).then((res) => res.data.profile);

export default {
  getUserProfile,
};
