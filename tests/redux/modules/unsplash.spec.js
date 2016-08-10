import {
  actions,
  default as unsplashReducer,
} from 'ACTIONS/unsplash'

describe('(Redux Module) unsplash', function () {
  describe('(ACTIONS)', function () {
    it('should export actions as an object', function () {
      expect(actions).to.be.a('object')
    })

    describe('(Action Creator) photoFetchSuccess', function () {
      it('Should be exported as a function', function () {
        expect(actions.photoFetchSuccess).to.be.a('function')
      })

      it('Should return an action with type "PHOTO_FETCH_SUCCESS" with payload', function () {
        let action = actions.photoFetchSuccess('success')
        expect(action).to.deep.equal({
          type: 'PHOTO_FETCH_SUCCESS',
          payload: {
            datas: 'success',
          },
        })
      })
    })

    describe('(Action Creator) photoFetchFailure', function () {
      it('Should be exported as a function', function () {
        expect(actions.photoFetchFailure).to.be.a('function')
      })

      it('Should return an action with type "PHOTO_FETCH_FAILURE" with payload', function () {
        let action = actions.photoFetchFailure('error')
        expect(action).to.deep.equal({
          type: 'PHOTO_FETCH_FAILURE',
          payload: {
            error: 'error',
          },
        })
      })
    })

    describe('(Action Creator) photoFetchSending', function () {
      it('Should be exported as a function', function () {
        expect(actions.photoFetchSending).to.be.a('function')
      })

      it('Should return an action with type "PHOTO_FETCH_SENDING"', function () {
        let action = actions.photoFetchSending()
        expect(action).to.deep.equal({ type: 'PHOTO_FETCH_SENDING' })
      })
    })

    describe('(Action Creator) photosFetchSending', function () {
      it('Should be exported as a function', function () {
        expect(actions.photosFetchSending).to.be.a('function')
      })

      it('Should return an action with type "PHOTOS_FETCH_SENDING" with payload', function () {
        let action = actions.photosFetchSending()
        expect(action).to.deep.equal({
          type: 'PHOTOS_FETCH_SENDING',
        })
      })
    })

    describe('(Action Creator) photosFetchSuccess', function () {
      it('Should be exported as a function', function () {
        expect(actions.photosFetchSuccess).to.be.a('function')
      })

      it('Should return an action with type "PHOTOS_FETCH_SUCCESS" with payload', function () {
        let action = actions.photosFetchSuccess('success')
        expect(action).to.deep.equal({
          type: 'PHOTOS_FETCH_SUCCESS',
          payload: {
            datas: 'success',
          },
        })
      })
    })

    describe('(Action Creator) photosFetchFailure', function () {
      it('Should be exported as a function', function () {
        expect(actions.photosFetchFailure).to.be.a('function')
      })

      it('Should return an action with type "PHOTOS_FETCH_FAILURE" with payload', function () {
        let action = actions.photosFetchFailure('error')
        expect(action).to.deep.equal({
          type: 'PHOTOS_FETCH_FAILURE',
          payload: {
            error: 'error',
          },
        })
      })
    })

    describe('(Action Creator) photoReset', function () {
      it('Should be exported as a function', function () {
        expect(actions.photoReset).to.be.a('function')
      })

      it('Should return an action with type "PHOTO_RESET" with payload', function () {
        let action = actions.photoReset()
        expect(action).to.deep.equal({
          type: 'PHOTO_RESET',
        })
      })
    })
  })

  describe('(Reducer)', function () {
    it('Should be a function', function () {
      expect(unsplashReducer).to.be.a('function')
    })

    it('Should initialize with a initial fetch unsplash state', function () {
      let state = unsplashReducer(undefined, {})
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: false,
      })
    })

    it('Should return the previous state if an action was not matched', function () {
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

  describe('(Action Handler)', function () {
    it('should set fetched photos', function () {
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

    it('should set error when fetching photos fails', function () {
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

    it('should set sending when fetching photos', function () {
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

    it('should set fetched photo', function () {
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

    it('should set error when fetching photo fails', function () {
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

    it('should set sending when fetching photo', function () {
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

    it('should reset photos', function () {
      let state = unsplashReducer(undefined, {})
      expect(state).to.deep.equal({
        datas: undefined,
        detail: undefined,
        error: undefined,
        sending: false,
      })

      state = unsplashReducer(state, actions.photosFetchSuccess('success 1'))
      expect(state).to.deep.equal({
        datas: 'success 1',
        detail: undefined,
        error: undefined,
        sending: false,
      })

      state = unsplashReducer(state, actions.photoFetchSuccess('success 2'))
      expect(state).to.deep.equal({
        datas: 'success 1',
        detail: 'success 2',
        error: undefined,
        sending: false,
      })

      state = unsplashReducer(state, actions.photoReset())
      expect(state).to.deep.equal({
        datas: 'success 1',
        detail: undefined,
        error: undefined,
        sending: false,
      })
    })
  })
})
