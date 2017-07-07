import React from 'react'

import RefreshIndicator from 'material-ui/RefreshIndicator'

const style = {
  container: {
    position: 'relative'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative'
  }
}

function LoadingIndicator () {
  return (
    <span style={{ position: 'relative', left: '50%' }}>
      <RefreshIndicator
        size={40}
        left={10}
        top={0}
        style={style.refresh}
        status='loading'
      />
    </span>
  )
}
export default LoadingIndicator
