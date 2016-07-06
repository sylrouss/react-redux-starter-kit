import React from 'react'
import { connect } from 'react-redux'
import { fetchPhotos, clearTest } from '../../services/ws/UnsplashWS'
import UnsplashImg from '../../components/UnsplashImg/UnsplashImg'

class Unsplash extends React.Component {

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.props.dispatch(fetchPhotos())
    if (this.props.content) {
      alert(this.props.content)
      this.props.dispatch(clearTest())
    }
  }

  componentWillUnmount () {

  }

  handleClick (event) {
    this.props.history.push('/detail/'+event.currentTarget.dataset.itemId)
  }

  render () {
    var images = this.props.datas
    return (
      <div className='container text-center'>
        <UnsplashImg datas={images} onClick={this.handleClick} />
      </div>)
  }
}

Unsplash.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  datas: React.PropTypes.array,
  content: React.PropTypes.string,
  history: React.PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    datas: state.UnsplashWS.datas,
    content: state.UnsplashWS.content,
  }
}

export default connect(mapStateToProps)(Unsplash)
