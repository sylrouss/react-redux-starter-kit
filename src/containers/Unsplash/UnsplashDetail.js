import React from 'react'
import { connect } from 'react-redux'
import { actions } from 'ACTIONS/unsplash'
import UnsplashImgDetail from 'COMPONENTS/UnsplashImg/UnsplashImgDetail'

const UnsplashDetail = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    detail: React.PropTypes.object,
    params: React.PropTypes.object,
    fetchPhoto: React.PropTypes.func.isRequired,
    history: React.PropTypes.object,
  },
  componentWillMount () {
    this._fetchData()
  },
  componentDidUpdate () {
    this._fetchData()
  },
  componentWillUnmount () {
    this.props.dispatch(actions.clearPhoto())
    this.props.dispatch(actions.testContent(prompt('Why?')))
  },
  _fetchData () {
    if (!this.props.detail) {
      this.props.fetchPhoto(this.props.params.id)
    }
  },
  _handleClick () {
    this.props.history.goBack()
  },
  render () {
    return (
      <div className='container text-center'>
        { this.props.detail && <UnsplashImgDetail item={ this.props.detail } onClick={ this._handleClick } /> }
      </div>)
  },
})

const mapStateToProps = ({ unsplash: { detail } }) => ({
  detail,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
  fetchPhoto: actions.fetchPhotosRequests(dispatch).fetchPhoto,
  clearTest: () => dispatch(actions.clearTest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UnsplashDetail)
