import React from 'react'
import { connect } from 'react-redux'
import { fetchPhoto, clearPhoto, testContent } from '../../services/ws/UnsplashWS'
import UnsplashImgDetail from '../../components/UnsplashImg/UnsplashImgDetail'

const Unsplash = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    detail: React.PropTypes.object,
    params: React.PropTypes.object,
    history: React.PropTypes.object,
  },
  componentDidMount () {
    this.props.dispatch(fetchPhoto(this.props.params.id))
  },
  componentWillUnmount () {
    this.props.dispatch(clearPhoto())
    this.props.dispatch(testContent(prompt('Why?')))
  },
  _handleClick () {
    this.props.history.goBack()
  },
  render () {
    return (
      <div className='container text-center'>
        <UnsplashImgDetail item={ this.props.detail } onClick={ this._handleClick } />
      </div>)
  },
})

const mapStateToProps = ({ UnsplashWS: { detail } }) => ({
  detail,
})

export default connect(mapStateToProps)(Unsplash)
