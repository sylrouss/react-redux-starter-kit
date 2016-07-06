import React from 'react'
import { connect } from 'react-redux'

class UnsplashImgDetail extends React.Component {

  render () {
    const item = this.props.item
    const click = this.props.onClick

    if (item && item.urls) {
      return (
          <div>
              <img src={item.urls.small} key={item.id} onClick={click}/>
          </div>
      )
    } else {
      return (
          <div></div>
      )
    }
  }

}

UnsplashImgDetail.propTypes = {
  item: React.PropTypes.object,
  onClick: React.PropTypes.func,
}

export default connect()(UnsplashImgDetail)
