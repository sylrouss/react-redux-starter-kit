require('isomorphic-fetch')

export const URL = 'https://api.unsplash.com'
export const METHOD = 'photos'
export const CLIENT_ID = 'a0b6423c05bef840adda4ad36e509b930f4a76c3d445783e3d1b45c3b7a1c765'

const PHOTO_FETCH_SUCCESS = 'PHOTO_FETCH_SUCCESS'
const PHOTO_FETCH_FAILURE = 'PHOTO_FETCH_FAILURE'
const PHOTO_FETCH_SENDING = 'PHOTO_FETCH_SENDING'
const PHOTOS_FETCH_SUCCESS = 'PHOTOS_FETCH_SUCCESS'
const PHOTOS_FETCH_FAILURE = 'PHOTOS_FETCH_FAILURE'
const PHOTOS_FETCH_SENDING = 'PHOTOS_FETCH_SENDING'

const photosFetchSending = () : Action => ({
  type: PHOTOS_FETCH_SENDING,
})

const photosFetchFailure = (error) => ({
  type: PHOTOS_FETCH_FAILURE,
  payload: {
    error: error,
  },
})

const photosFetchSuccess = (data) => ({
  type: PHOTOS_FETCH_SUCCESS,
  payload: {
    datas: data,
  },
})

const photoFetchSending = () : Action => ({
  type: PHOTO_FETCH_SENDING,
})

const photoFetchFailure = (error) => ({
  type: PHOTO_FETCH_FAILURE,
  payload: {
    error: error,
  },
})

const photoFetchSuccess = (data) => ({
  type: PHOTO_FETCH_SUCCESS,
  payload: {
    datas: data,
  },
})

const fetchPhotosRequests = (dispatch) => {
  const fetchPhotos = () => {
    dispatch(photosFetchSending())
    fetch(`${ URL }/${ METHOD }?client_id=${ CLIENT_ID }`)
      .then(response => response.json())
      .then(data => {
        dispatch(photosFetchSuccess(data))
      })
      .catch(error => {
        dispatch(photosFetchFailure(error))
      })
  }

  const fetchPhoto = (id) => {
    dispatch(photoFetchSending())
    fetch(`${ URL }/${ METHOD }/${ id }?client_id=${ CLIENT_ID }`)
      .then(response => response.json())
      .then(data => {
        dispatch(photoFetchSuccess(data))
      })
      .catch(error => {
        dispatch(photoFetchFailure(error))
      })
  }
  return {
    fetchPhotos,
    fetchPhoto,
  }
}

export const actions = {
  fetchPhotosRequests,
  photoFetchFailure,
  photoFetchSending,
  photoFetchSuccess,
  photosFetchFailure,
  photosFetchSending,
  photosFetchSuccess,
}

const ACTION_HANDLERS = {
  [PHOTO_FETCH_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload.error,
    sending: false,
  }),
  [PHOTO_FETCH_SENDING]: (state, action) => ({
    ...state,
    detail: undefined,
    sending: true,
  }),
  [PHOTO_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    detail: action.payload.datas,
    error: undefined,
    sending: false,
  }),
  [PHOTOS_FETCH_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload.error,
    sending: false,
  }),
  [PHOTOS_FETCH_SENDING]: (state, action) => ({
    ...state,
    datas: undefined,
    sending: true,
  }),
  [PHOTOS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    datas: action.payload.datas,
    error: undefined,
    sending: false,
  }),
}

const initialState = {
  datas: undefined,
  detail: undefined,
  error: undefined,
  sending: false,
}

export default function unsplashReducer (state = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
