import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { actions } from 'ACTIONS/unsplash'
import UnsplashImg from 'COMPONENTS/UnsplashImg/UnsplashImg'

class Unsplash extends React.Component {
  componentWillMount () {
    this._fetchData()
  }
  componentDidUpdate () {
    this._fetchData()
  }
  _fetchData = () => {
    if (!this.props.datas) {
      this.props.fetchPhotos()
    }
  }
  _handleClick = (id) => {
    this.props.dispatch(push(`/detail?id=${ id }`))
  }
  render = () =>
    <div className='container text-center'>
      { this.props.datas && <UnsplashImg datas={ this.props.datas } onClick={ this._handleClick } /> }
    </div>
}

Unsplash.propTypes = {
  datas: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
}

const mapStateToProps = ({ unsplash: { datas } }) => ({
  datas,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  fetchPhotos: actions.fetchPhotosRequests(dispatch).fetchPhotos,
})

export default connect(mapStateToProps, mapDispatchToProps)(Unsplash)
