import React from 'react'
import { push } from 'react-router-redux'
import Unsplash from 'containers/Unsplash/Unsplash'
import { actions } from 'ACTIONS/unsplash'
import { Provider } from 'react-redux'
import { createMockStore, mount } from '../../testHelpers'

describe('(containers) App', () => {
  let fetchPhotos, props, store

  afterEach(() => {
    actions.fetchPhotosRequests.restore()
  })

  it('should fetch photos on mount', () => {
    let container = getContainer()
    expect(container.find('div').text()).to.be.equal('')
    sinon.assert.calledWith(fetchPhotos)
  })

  it('should display datas', () => {
    let datas = [{ id: '1', urls: { small: 'http://foo.bar.com/image.png' } }]
    let container = getContainer({ unsplash: { datas: datas } })
    expect(container.find('UnsplashImg')).not.to.be.undefined
    expect(fetchPhotos.callCount).to.be.equal(0)
  })

  it('should dispatch a new route when clicking on one image ', () => {
    let datas = [{ id: '0', urls: { small: 'image1.png' } }, { id: '1', urls: { small: 'image2.png' } }]
    let container = getContainer({ unsplash: { datas: datas } })
    let images = container.find('img')
    expect(images).to.have.length(2)
    images.at(0).simulate('click')
    sinon.assert.calledWith(store.dispatch, push('/detail?id=0'))
    images.at(1).simulate('click')
    sinon.assert.calledWith(store.dispatch, push('/detail?id=1'))
  })

  const getContainer = (state = { unsplash: {} }) => {
    store = createMockStore(state)
    let fetchPhotosRequests = sinon.stub(actions, 'fetchPhotosRequests')
    fetchPhotos = sinon.spy()
    fetchPhotosRequests.returns({ fetchPhotos })
    props = { }
    return mount(<Provider store={ store }><Unsplash { ...props } /></Provider>)
  }
})
