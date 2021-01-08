import axios from "./axios";

const getComments = (slug) =>
  axios.get(`/articles/${slug}/comments`).then((res) => res.data.comments);

const postComment = (slug, commentInput) =>
  axios
    .post(`/articles/${slug}/comments`, { comment: { body: commentInput } })
    .then((res) => res.data.comments);

const deleteComment = (slug, commentId) =>
  axios.delete(`/articles/${slug}/comments/${commentId}`);

export default {
  getComments,
  postComment,
  deleteComment,
};
