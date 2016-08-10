import React from 'react'
import styles from './App.less'

const App = ({ children }) => (
  <div className={ styles.appContent }>
    { children }
  </div>
)

export default App
