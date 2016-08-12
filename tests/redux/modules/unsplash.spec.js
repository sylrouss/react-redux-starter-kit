import {
  actions,
  default as unsplashReducer,
  URL, METHOD, CLIENT_ID,
} from 'ACTIONS/unsplash'
import fetchMock from 'fetch-mock'

describe('(Redux Module) unsplash', () => {
  describe('(ACTIONS)', () => {
    it('should export actions as an object', () => {
      expect(actions).to.be.a('object')
    })

    describe('(Action Creator) photoFetchSuccess', () => {
      it('should be exported as a function', () => {
        expect(actions.photoFetchSuccess).to.be.a('function')
      })

      it('should return an action with type "PHOTO_FETCH_SUCCESS" with payload', () => {
        let action = actions.photoFetchSuccess('success')
        expect(action).to.deep.equal({
          type: 'PHOTO_FETCH_SUCCESS',
          payload: {
            datas: 'success',
          },
        })
      })
    })

    describe('(Action Creator) photoFetchFailure', () => {
      it('should be exported as a function', () => {
        expect(actions.photoFetchFailure).to.be.a('function')
      })

      it('should return an action with type "PHOTO_FETCH_FAILURE" with payload', () => {
        let action = actions.photoFetchFailure('error')
        expect(action).to.deep.equal({
          type: 'PHOTO_FETCH_FAILURE',
          payload: {
            error: 'error',
          },
        })
      })
    })

    describe('(Action Creator) photoFetchSending', () => {
      it('should be exported as a function', () => {
        expect(actions.photoFetchSending).to.be.a('function')
      })

      it('should return an action with type "PHOTO_FETCH_SENDING"', () => {
        let action = actions.photoFetchSending()
        expect(action).to.deep.equal({ type: 'PHOTO_FETCH_SENDING' })
      })
    })

    describe('(Action Creator) photosFetchSending', () => {
      it('should be exported as a function', () => {
        expect(actions.photosFetchSending).to.be.a('function')
      })

      it('should return an action with type "PHOTOS_FETCH_SENDING" with payload', () => {
        let action = actions.photosFetchSending()
        expect(action).to.deep.equal({
          type: 'PHOTOS_FETCH_SENDING',
        })
      })
    })

    describe('(Action Creator) photosFetchSuccess', () => {
      it('should be exported as a function', () => {
        expect(actions.photosFetchSuccess).to.be.a('function')
      })

      it('should return an action with type "PHOTOS_FETCH_SUCCESS" with payload', () => {
        let action = actions.photosFetchSuccess('success')
        expect(action).to.deep.equal({
          type: 'PHOTOS_FETCH_SUCCESS',
          payload: {
            datas: 'success',
          },
        })
      })
    })

    describe('(Action Creator) photosFetchFailure', () => {
      it('should be exported as a function', () => {
        expect(actions.photosFetchFailure).to.be.a('function')
      })

      it('should return an action with type "PHOTOS_FETCH_FAILURE" with payload', () => {
        let action = actions.photosFetchFailure('error')
        expect(action).to.deep.equal({
          type: 'PHOTOS_FETCH_FAILURE',
          payload: {
            error: 'error',
          },
        })
      })
    })
  })

  describe('(Reducer)', () => {
    it('should be a function', () => {
      expect(unsplashReducer).to.be.a('function')
    })

    it('should initialize with a initial fetch unsplash state', () => {
      let state = unsplashReducer(undefined, {})
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: false,
      })
    })

    it('should return the previous state if an action was not matched', () => {
      let state = unsplashReducer(undefined, {})
      expect(unsplashReducer(state, { type: '@@@@@@@' })).to.deep.equal(state)

      state = unsplashReducer(state, actions.photoFetchFailure('error'))
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: 'error',
        sending: false,
      })

      expect(unsplashReducer(state, { type: '@@@@@@@' })).to.deep.equal(state)
    })
  })

  describe('(Action Handler)', () => {
    it('should set fetched photos', () => {
      let state = unsplashReducer(undefined, {})
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: false,
      })

      state = unsplashReducer(state, actions.photosFetchSuccess('photos'))
      expect(state).to.deep.equal({
        datas: 'photos',
        detail: undefined,
        error: undefined,
        sending: false,
      })
    })

    it('should set error when fetching photos fails', () => {
      let state = unsplashReducer(undefined, {})
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: false,
      })

      state = unsplashReducer(state, actions.photosFetchFailure('error'))
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: 'error',
        sending: false,
      })
    })

    it('should set sending when fetching photos', () => {
      let state = unsplashReducer(undefined, {})
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: false,
      })

      state = unsplashReducer(state, actions.photosFetchSending())
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: true,
      })
    })

    it('should set fetched photo', () => {
      let state = unsplashReducer(undefined, {})
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: false,
      })

      state = unsplashReducer(state, actions.photoFetchSuccess('photos'))
      expect(state).to.deep.equal({
        datas: undefined,
        detail: 'photos',
        error: undefined,
        sending: false,
      })
    })

    it('should set error when fetching photo fails', () => {
      let state = unsplashReducer(undefined, {})
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: false,
      })

      state = unsplashReducer(state, actions.photoFetchFailure('error'))
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: 'error',
        sending: false,
      })
    })

    it('should set sending when fetching photo', () => {
      let state = unsplashReducer(undefined, {})
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: false,
      })

      state = unsplashReducer(state, actions.photoFetchSending())
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: true,
      })
    })
  })

  describe('(Request)', () => {
    it('should fetch photo', (done) => {
      let dispatch = sinon.spy()
      let fetchPhoto = actions.fetchPhotosRequests(dispatch).fetchPhoto
      fetchMock.restore().get(`${ URL }/${ METHOD }/${ 1 }?client_id=${ CLIENT_ID }`, JSON.stringify('content'))
      fetchPhoto(1)
      setTimeout(() => {
        sinon.assert.callCount(dispatch, 2)
        sinon.assert.calledWith(dispatch, actions.photoFetchSending())
        sinon.assert.calledWith(dispatch, actions.photoFetchSuccess('content'))
        done()
      }, 100)
    })

    it('should handle failure when fetching photo', (done) => {
      let dispatch = sinon.spy()
      let fetchPhoto = actions.fetchPhotosRequests(dispatch).fetchPhoto
      fetchMock.restore().get(`${ URL }/${ METHOD }/${ 1 }?client_id=${ CLIENT_ID }`, 400,
        { response: { throws: 'error' } })
      fetchPhoto(1)
      setTimeout(() => {
        sinon.assert.callCount(dispatch, 2)
        sinon.assert.calledWith(dispatch, actions.photoFetchSending())
        sinon.assert.calledWith(dispatch, actions.photoFetchFailure('error'))
        done()
      }, 100)
    })

    it('should fetch photos', (done) => {
      let dispatch = sinon.spy()
      let fetchPhotos = actions.fetchPhotosRequests(dispatch).fetchPhotos
      fetchMock.restore().get(`${ URL }/${ METHOD }?client_id=${ CLIENT_ID }`, JSON.stringify(['content']))
      fetchPhotos()
      setTimeout(() => {
        sinon.assert.callCount(dispatch, 2)
        sinon.assert.calledWith(dispatch, actions.photosFetchSending())
        sinon.assert.calledWith(dispatch, actions.photosFetchSuccess(['content']))
        done()
      }, 100)
    })

    it('should handle failure when fetching photos', (done) => {
      let dispatch = sinon.spy()
      let fetchPhotos = actions.fetchPhotosRequests(dispatch).fetchPhotos
      fetchMock.restore().get(`${ URL }/${ METHOD }?client_id=${ CLIENT_ID }`, 400, { response: { throws: 'error' } })
      fetchPhotos()
      setTimeout(() => {
        sinon.assert.callCount(dispatch, 2)
        sinon.assert.calledWith(dispatch, actions.photosFetchSending())
        sinon.assert.calledWith(dispatch, actions.photosFetchFailure('error'))
        done()
      }, 100)
    })
  })
})
