import React from 'react'
import PropTypes from 'prop-types'

class UnsplashImgDetail extends React.Component {
  render = () =>
    <div>
      { this.props.item && this.props.item.urls &&
        <img src={ this.props.item.urls.small } key={ this.props.item.id } onClick={ this.props.onClick } /> }
    </div>
}

UnsplashImgDetail.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func.isRequired,
}

export default UnsplashImgDetail
