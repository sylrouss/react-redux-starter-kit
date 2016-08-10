let urlserver = 'https://api.unsplash.com/'
let method = 'photos'
let clientID = '?client_id=a0b6423c05bef840adda4ad36e509b930f4a76c3d445783e3d1b45c3b7a1c765'

const SET_PHOTOS = 'SET_PHOTOS'
const SET_PHOTO = 'SET_PHOTO'
const CLEAR_PHOTO = 'CLEAR_PHOTO'
const CLEAR_TEST = 'CLEAR_TEST'
const TEST = 'TEST'

const setPhotos = (data) => ({
  type: SET_PHOTOS,
  datas: data,
})

const setPhoto = (data) => ({
  type: SET_PHOTO,
  datas: data,
})

const clearPhoto = () => ({
  type: CLEAR_PHOTO,
})

const testContent = (value) => ({
  type: TEST,
  content: value,
})

const clearTest = () => ({
  type: CLEAR_TEST,
})

const fetchPhotosRequests = (dispatch) => {
  const fetchPhotos = () =>
    fetch(urlserver+method+clientID)
      .then(r => r.json())
      .then(data => {
        dispatch(setPhotos(data))
      })
      .catch(error => {
        console.log(JSON.stringify(error))
        console.log(`Erreur status: ${ error.status }`)
        console.log(`Erreur code: ${ error.code }`)
      })

  const fetchPhoto = (id) =>
    fetch(urlserver+method+'/'+id+clientID)
      .then(r => r.json())
      .then(data => {
        dispatch(setPhoto(data))
      })
      .catch(error => {
        console.log(JSON.stringify(error))
        console.log(`Erreur status: ${ error.status }`)
        console.log(`Erreur code: ${ error.code }`)
      })

  return {
    fetchPhotos,
    fetchPhoto,
  }
}

export const actions = {
  clearPhoto,
  clearTest,
  testContent,
  setPhoto,
  setPhotos,
  fetchPhotosRequests,
}

const ACTION_HANDLERS = {
  [CLEAR_PHOTO]: (state, action) => ({
    ...state,
    detail: undefined,
  }),
  [CLEAR_TEST]: (state, action) => ({
    ...state,
    content: undefined,
  }),
  [SET_PHOTO]: (state, action) => ({
    ...state,
    detail: action.datas,
  }),
  [SET_PHOTOS]: (state, action) => ({
    ...state,
    datas: action.datas,
  }),
  [TEST]: (state, action) => ({
    ...state,
    content: action.content,
  }),
}

const initialState = {
  content: undefined,
  datas: undefined,
  detail: undefined,
}

export default function unsplashReducer (state = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
