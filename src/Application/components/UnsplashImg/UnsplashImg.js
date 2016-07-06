import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import styles from './UnsplashImg.less'

class UnsplashImg extends React.Component {

  render () {
    const datas = this.props.datas
    const click = this.props.onClick

    var showImages = datas.map(function (item, index) {
      // return <Link to={`/detail/${item.id}`} key={item.id}><img src={item.urls.small} onClick={click}/></Link>
      return <img src={item.urls.small} key={item.id} onClick={click} data-item-id={item.id}/>
    })

    return (
      <div>
            {showImages}
      </div>
    )
  }

}

UnsplashImg.propTypes = {
  datas: React.PropTypes.array,
  onClick: React.PropTypes.func,
}

export default connect()(UnsplashImg)
