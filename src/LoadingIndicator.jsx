import React from 'react'

import RefreshIndicator from 'material-ui/RefreshIndicator'

const style = {
  container: {
    position: 'relative'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    left: '10%'
  }
}

function LoadingIndicator () {
  return (
    <RefreshIndicator
      size={40}
      left={10}
      top={0}
      style={style.refresh}
      status='loading'
    />
  )
}
export default LoadingIndicator
