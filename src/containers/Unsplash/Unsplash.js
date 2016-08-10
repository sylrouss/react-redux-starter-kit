import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { actions } from 'ACTIONS/unsplash'
import UnsplashImg from 'COMPONENTS/UnsplashImg/UnsplashImg'

const Unsplash = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    datas: React.PropTypes.array,
    clearTest: React.PropTypes.func.isRequired,
    content: React.PropTypes.string,
    fetchPhotos: React.PropTypes.func.isRequired,
    history: React.PropTypes.object,
  },
  componentWillMount () {
    this._fetchData()
  },
  componentDidUpdate () {
    this._fetchData()
  },
  componentDidMount () {
    if (this.props.content) {
      alert(this.props.content)
      this.props.clearTest()
    }
  },
  _fetchData () {
    if (!this.props.datas) {
      this.props.fetchPhotos()
    }
  },
  _handleClick (event) {
    this.props.dispatch(push(`/detail/${ event.currentTarget.dataset.itemId }`))
  },
  render () {
    return (
      <div className='container text-center'>
        Hello Jeremy
        { this.props.datas && <UnsplashImg datas={ this.props.datas } onClick={ this._handleClick } /> }
      </div>)
  },
})

const mapStateToProps = ({ unsplash: { datas, content } }) => ({
  datas,
  content,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
  fetchPhotos: actions.fetchPhotosRequests(dispatch).fetchPhotos,
  clearTest: () => dispatch(actions.clearTest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Unsplash)
