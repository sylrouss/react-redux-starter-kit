import React from 'react'
import UnsplashDetail from 'containers/Unsplash/UnsplashDetail'
import { actions } from 'ACTIONS/unsplash'
import { Provider } from 'react-redux'
import { createMockStore, mount } from '../../testHelpers'

describe('(containers) App', () => {
  let fetchPhoto, goBack, props, store

  afterEach(() => {
    actions.fetchPhotosRequests.restore()
  })

  it('should fetch photo on mount', () => {
    getContainer(1)
    sinon.assert.calledWith(fetchPhoto, '1')
  })

  it('should never fetch photo on mount when already mounted', () => {
    let detail = { id: '1', urls: { small: 'http://foo.bar.com/image.png' } }
    getContainer(1, { unsplash: { detail: detail } })
    sinon.assert.neverCalledWith(fetchPhoto, '1')
  })

  it('should fetch new photo on mount', () => {
    let detail = { id: '2', urls: { small: 'http://foo.bar.com/image.png' } }
    getContainer(1, { unsplash: { detail: detail } })
    sinon.assert.calledWith(fetchPhoto, '1')
  })

  it('should display detail', () => {
    let detail = { id: '1', urls: { small: 'http://foo.bar.com/image.png' } }
    let container = getContainer(1, { unsplash: { detail: detail } })
    expect(container.find('UnsplashImgDetail')).not.to.be.undefined
  })

  it('should go back when clicking on image', () => {
    let detail = { id: '1', urls: { small: 'http://foo.bar.com/image.png' } }
    let container = getContainer(1, { unsplash: { detail: detail } })
    let image = container.find('img')
    image.simulate('click')
    sinon.assert.calledOnce(goBack)
  })

  const getContainer = (id, state = { unsplash: {} }) => {
    store = createMockStore(state)
    let fetchPhotosRequests = sinon.stub(actions, 'fetchPhotosRequests')
    fetchPhoto = sinon.spy()
    fetchPhotosRequests.returns({ fetchPhoto })
    goBack = sinon.spy()
    props = { history: { goBack }, location: { search: `?id=${ id }` } }
    return mount(<Provider store={ store }><UnsplashDetail { ...props } /></Provider>)
  }
})
