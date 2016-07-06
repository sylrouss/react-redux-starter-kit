import { errorLoading } from '../manager/HttpManager'

let urlserver = 'https://api.unsplash.com/'
let method = 'photos'
let clientID = '?client_id=a0b6423c05bef840adda4ad36e509b930f4a76c3d445783e3d1b45c3b7a1c765'

export const UnsplashWS = (state = { datas: [] }, action) => {
  switch (action.type) {
    case 'SET_PHOTOS':
      return Object.assign({}, state, { datas: action.datas })
    case 'SET_PHOTO':
      return Object.assign({}, state, { detail: action.datas })
    case 'CLEAR_PHOTO':
      return Object.assign({}, state, { detail: undefined })
    case 'TEST':
      return Object.assign({}, state, { content: action.content })
    case 'CLEAR_TEST':
      return Object.assign({}, state, { content: undefined })
    default:
      return state
  }
}

export const setPhotos = (data) => {
  return {
    type: 'SET_PHOTOS',
    datas: data,
  }
}

export function fetchPhotos () {
  return (dispatch, state) => {
    fetch(urlserver+method+clientID)
      .then(r => r.json())
      .then(data => {
        dispatch(setPhotos(data))
      })
      .catch(error => (
        console.log(JSON.stringify(error)),
          console.log(`Erreur status: ${error.status}`),
          console.log(`Erreur code: ${error.code}`),
          dispatch(errorLoading(`Erreur durant la récupération des users: ${JSON.stringify(error)}`))
      ))
  }
}

export const setPhoto = (data) => {
  return {
    type: 'SET_PHOTO',
    datas: data,
  }
}

export const clearPhoto = () => {
  return {
    type: 'CLEAR_PHOTO',
  }
}

export function fetchPhoto (id) {
  return (dispatch, state) => {
    fetch(urlserver+method+'/'+id+clientID)
      .then(r => r.json())
      .then(data => {
        dispatch(setPhoto(data))
      })
      .catch(error => (
        console.log(JSON.stringify(error)),
          console.log(`Erreur status: ${error.status}`),
          console.log(`Erreur code: ${error.code}`),
          dispatch(errorLoading(`Erreur durant la récupération des users: ${JSON.stringify(error)}`))
      ))
  }
}

export const testContent = (value) => {
  return {
    type: 'TEST',
    content: value,
  }
}

export const clearTest = () => {
  return {
    type: 'CLEAR_TEST',
  }
}
