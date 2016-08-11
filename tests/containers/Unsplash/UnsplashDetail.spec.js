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
    let container = getContainer()
    expect(container.find('div').text()).to.be.equal('')
    sinon.assert.calledWith(fetchPhoto, undefined)
  })

  it('should display detail', () => {
    let detail = { id: '1', urls: { small: 'http://foo.bar.com/image.png' } }
    let container = getContainer({ unsplash: { detail: detail } })
    expect(container.find('UnsplashImgDetail')).not.to.be.undefined
    expect(fetchPhoto.callCount).to.be.equal(0)
  })

  it('should go back when clicking on image', () => {
    let detail = { id: '1', urls: { small: 'http://foo.bar.com/image.png' } }
    let container = getContainer({ unsplash: { detail: detail } })
    let image = container.find('img')
    image.simulate('click')
    sinon.assert.calledOnce(goBack)
  })

  const getContainer = (state = { unsplash: {} }) => {
    store = createMockStore(state)
    let fetchPhotosRequests = sinon.stub(actions, 'fetchPhotosRequests')
    fetchPhoto = sinon.spy()
    fetchPhotosRequests.returns({ fetchPhoto })
    goBack = sinon.spy()
    props = { history: { goBack } }
    return mount(<Provider store={ store }><UnsplashDetail { ...props } /></Provider>)
  }
})
