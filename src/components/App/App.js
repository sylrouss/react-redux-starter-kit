import React, { PropTypes } from 'react'
import styles from 'STYLES/all.less'

function App ({ children }) {
  return (
    <div className={styles.appContent}>
      {children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element,
}

export default App
