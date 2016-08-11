import React from 'react'
import { default as UnsplashImg } from 'COMPONENTS/UnsplashImg/UnsplashImg'
import { mount } from '../../testHelpers'

describe('(component) UnsplashImg', () => {
  describe('Testing structure of the component', () => {
    it('should render an image', () => {
      let props = { datas: [
        { id: '1', urls: { small: 'http://foo.bar.com/image1.png' } },
        { id: '2', urls: { small: 'http://foo.bar.com/image2.png' } },
      ], onClick: sinon.spy() }
      const wrapper = mount(<UnsplashImg { ...props } />)
      let images = wrapper.find('img')
      expect(images).to.have.length(2)
      expect(images.get(0).src).to.equal('http://foo.bar.com/image1.png')
      expect(images.get(1).src).to.equal('http://foo.bar.com/image2.png')
    })

    it('should render an empty div when datas is undefined', () => {
      let props = { onClick: sinon.spy() }
      const wrapper = mount(<UnsplashImg { ...props } />)
      expect(wrapper.find('div')).to.have.length(1)
      expect(wrapper.find('img')).to.have.length(0)
    })
  })

  describe('Testing user interaction of the component', () => {
    it('should render an image', () => {
      let props = { datas: [
        { id: '1', urls: { small: 'http://foo.bar.com/image1.png' } },
        { id: '2', urls: { small: 'http://foo.bar.com/image2.png' } },
      ], onClick: sinon.spy() }
      const wrapper = mount(<UnsplashImg { ...props } />)
      let images = wrapper.find('img')
      images.at(0).simulate('click')
      sinon.assert.calledWith(props.onClick, '1')
      images.at(1).simulate('click')
      sinon.assert.calledWith(props.onClick, '2')
    })
  })
})
