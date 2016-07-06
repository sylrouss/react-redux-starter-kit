import React from 'react'
import styles from './UnsplashImg.less'

class UnsplashImg extends React.Component {
  render () {
    return (
      <div className={ styles.imagesContainer }>
        { this.props.datas &&
          this.props.datas.map((item, index) =>
            <img
              src={ item.urls.small }
              key={ item.id }
              onClick={ this.props.onClick }
              data-item-id={ item.id } />
          )
        }
      </div>
    )
  }
}

UnsplashImg.propTypes = {
  datas: React.PropTypes.array,
  onClick: React.PropTypes.func,
}

export default UnsplashImg
