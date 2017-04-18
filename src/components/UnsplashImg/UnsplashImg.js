import React from 'react'
import PropTypes from 'prop-types'
import styles from './UnsplashImg.less'

class UnsplashImg extends React.Component {
  render = () =>
    <div className={ styles.imagesContainer }>
      { this.props.datas && this.props.datas.map((item, index) =>
        <img
          src={ item.urls.small }
          key={ item.id }
          onClick={ this.props.onClick.bind(null, item.id) } />
        )
      }
    </div>
}

UnsplashImg.PropTypes = {
  datas: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}

export default UnsplashImg
