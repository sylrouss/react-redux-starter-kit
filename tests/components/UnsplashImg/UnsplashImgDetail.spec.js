import React from 'react'
import { default as UnsplashImgDetail } from 'COMPONENTS/UnsplashImg/UnsplashImgDetail'
import { mount } from '../../testHelpers'

describe('(component) UnsplashImgDetail', () => {
  describe('Testing structure of the component', () => {
    it('should render an image', () => {
      let props = { item: { id: '1', urls: { small: 'http://foo.bar.com/image.png' } } }
      const wrapper = mount(<UnsplashImgDetail { ...props } />)
      expect(wrapper.find('img')).to.have.length(1)
      const image = wrapper.find('img')
      expect(image.get(0).src).to.equal('http://foo.bar.com/image.png')
    })

    it('should render an empty div when item is undefined', () => {
      let props = { }
      const wrapper = mount(<UnsplashImgDetail { ...props } />)
      expect(wrapper.find('div')).to.have.length(1)
      expect(wrapper.find('img')).to.have.length(0)
    })
  })

  describe('Testing user interaction of the component', () => {
    it('should render an image', () => {
      let props = { item: { id: '1', urls: { small: 'http://foo.bar.com/image.png' } }, onClick: sinon.spy() }
      const wrapper = mount(<UnsplashImgDetail { ...props } />)
      const image = wrapper.find('img')
      image.simulate('click')
      sinon.assert.calledOnce(props.onClick)
    })
  })
})
