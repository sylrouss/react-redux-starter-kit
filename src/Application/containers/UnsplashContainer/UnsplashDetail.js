import React from 'react'
import { connect } from 'react-redux'
import {fetchPhoto, clearPhoto, testContent} from '../../services/ws/UnsplashWS'
import UnsplashImgDetail from '../../components/UnsplashImg/UnsplashImgDetail'

class Unsplash extends React.Component {

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(fetchPhoto(this.props.params.id))
  }

  componentWillUnmount () {
    this.props.dispatch(clearPhoto())
    this.props.dispatch(testContent(prompt('Why?')))
  }

  handleClick () {
    this.props.history.goBack()
  }

  render () {
    var image = this.props.data
    return (
      <div className='container text-center'>
        <UnsplashImgDetail item={image} onClick={this.handleClick} />
      </div>)
  }
}

Unsplash.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  data: React.PropTypes.object,
  params: React.PropTypes.object,
  history: React.PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    data: state.UnsplashWS.detail,
  }
}

export default connect(mapStateToProps)(Unsplash)
