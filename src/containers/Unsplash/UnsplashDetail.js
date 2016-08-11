import React from 'react'
import { connect } from 'react-redux'
import { parseQueryString } from '../../utils/queryHelper'
import { actions } from 'ACTIONS/unsplash'
import UnsplashImgDetail from 'COMPONENTS/UnsplashImg/UnsplashImgDetail'

const UnsplashDetail = React.createClass({
  propTypes: {
    detail: React.PropTypes.object,
    fetchPhoto: React.PropTypes.func.isRequired,
    history: React.PropTypes.object,
  },
  componentWillMount () {
    this._fetchData()
  },
  componentDidUpdate () {
    this._fetchData()
  },
  _fetchData () {
    if (!this.props.detail) {
      let query = parseQueryString(location.search)
      this.props.fetchPhoto(query.id)
    }
  },
  _handleClick () {
    this.props.history.goBack()
  },
  render () {
    return (
      <div className='container text-center'>
        { this.props.detail && <UnsplashImgDetail item={ this.props.detail } onClick={ this._handleClick } /> }
      </div>
    )
  },
})

const mapStateToProps = ({ unsplash: { detail } }) => ({
  detail,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
  fetchPhoto: actions.fetchPhotosRequests(dispatch).fetchPhoto,
})

export default connect(mapStateToProps, mapDispatchToProps)(UnsplashDetail)
