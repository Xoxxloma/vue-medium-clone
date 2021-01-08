import axios from "./axios";

const getArticle = (slug) =>
  axios.get(`/articles/${slug}`).then((res) => res.data.article);

const deleteArticle = (slug) => axios.delete(`/articles/${slug}`);

const createArticle = (articleInput) =>
  axios
    .post(`/articles`, { article: articleInput })
    .then((res) => res.data.article);

const updateArticle = (slug, articleInput) =>
  axios.put(`/articles/${slug}`, articleInput).then((res) => res.data.article);

export default {
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle,
};
