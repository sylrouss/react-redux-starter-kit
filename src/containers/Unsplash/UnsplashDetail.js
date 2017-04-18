import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { parseQueryString } from '../../utils/queryHelper'
import { actions } from 'ACTIONS/unsplash'
import UnsplashImgDetail from 'COMPONENTS/UnsplashImg/UnsplashImgDetail'

class UnsplashDetail extends React.Component {
  componentWillMount () {
    this._fetchData()
  }
  componentDidUpdate () {
    this._fetchData()
  }
  _fetchData = () => {
    let query = parseQueryString(this.props.location.search)
    if (!this.props.detail || this.props.detail.id !== query.id) {
      this.props.fetchPhoto(query.id)
    }
  }
  _handleClick = () => {
    this.props.history.goBack()
  }
  render = () => {
    return (
      <div className='container text-center'>
        { this.props.detail && <UnsplashImgDetail item={ this.props.detail } onClick={ this._handleClick } /> }
      </div>
    )
  }
}

UnsplashDetail.propTypes = {
  detail: PropTypes.object,
  fetchPhoto: PropTypes.func.isRequired,
  location: PropTypes.object,
}

const mapStateToProps = ({ unsplash: { detail } }) => ({
  detail,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
  fetchPhoto: actions.fetchPhotosRequests(dispatch).fetchPhoto,
})

export default connect(mapStateToProps, mapDispatchToProps)(UnsplashDetail)
