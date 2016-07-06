import React from 'react'

export default ({ item, onClick }) => (
  <div>
    { item && item.urls && <img src={ item.urls.small } key={ item.id } onClick={ onClick }/> }
  </div>
)
