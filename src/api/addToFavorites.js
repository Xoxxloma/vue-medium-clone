import axios from './axios'

const addToFavorites = (slug) => axios.post(`/articles/${slug}/favorite`).then(res => res.data.article)

const removeFromFavorites = (slug) => axios.delete(`/articles/${slug}/favorite`).then(res => res.data.article)

export default {
  addToFavorites,
  removeFromFavorites
}