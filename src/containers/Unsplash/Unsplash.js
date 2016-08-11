import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { actions } from 'ACTIONS/unsplash'
import UnsplashImg from 'COMPONENTS/UnsplashImg/UnsplashImg'

const Unsplash = React.createClass({
  propTypes: {
    datas: React.PropTypes.array,
    dispatch: React.PropTypes.func.isRequired,
    fetchPhotos: React.PropTypes.func.isRequired,
    history: React.PropTypes.object,
  },
  componentWillMount () {
    this._fetchData()
  },
  componentDidUpdate () {
    this._fetchData()
  },
  _fetchData () {
    if (!this.props.datas) {
      this.props.fetchPhotos()
    }
  },
  _handleClick (id) {
    this.props.dispatch(push(`/detail?id=${ id }`))
  },
  render () {
    return (
      <div className='container text-center'>
        { this.props.datas && <UnsplashImg datas={ this.props.datas } onClick={ this._handleClick } /> }
      </div>)
  },
})

const mapStateToProps = ({ unsplash: { datas } }) => ({
  datas,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
  fetchPhotos: actions.fetchPhotosRequests(dispatch).fetchPhotos,
})

export default connect(mapStateToProps, mapDispatchToProps)(Unsplash)
