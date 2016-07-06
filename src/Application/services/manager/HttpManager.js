export const http = (state = { state: 'LOADED', error: undefined }, action) => {
  switch (action.type) {
    case 'LOADING':
      return Object.assign({}, state, { state: 'LOADING', text: action.text, error: undefined })
    case 'LOADED':
      return Object.assign({}, state, { state: 'LOADED', text: action.text, error: undefined })
    case 'ERROR':
      console.log('HTTP error => ' + action.error)
      return Object.assign({}, state, { state: 'ERROR', text: undefined, error: action.error })
    default:
      return state
  }
}

export const loading = (what) => {
  return {
    type: 'LOADING',
    text: what,
  }
}

export const loaded = (what) => {
  return {
    type: 'LOADED',
    text: what,
  }
}

export const errorLoading = (error) => {
  return {
    type: 'ERROR',
    error,
  }
}
