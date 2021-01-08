const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data)) 
  } catch(e) {
    console.log('error saving in localStorage', e)
  }
}

const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch(e) {
    console.log('error getting from localStorage', e)
    return null
  }
}

export default {
  getItem,
  setItem,
}