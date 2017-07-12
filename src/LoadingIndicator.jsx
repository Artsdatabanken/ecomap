import React from 'react'
import ReactDOM from 'react-dom'

import RefreshIndicator from 'material-ui/RefreshIndicator'

const style = {
  refresh: {
    display: 'inline-block',
    position: 'relative'
  }
}

class LoadingIndicator extends React.Component {
  render () {
    return (
      <span style={{ position: 'relative', left: '50%' }}
        ref={(me) => { this.loading = ReactDOM.findDOMNode(me) }}
      >
        <RefreshIndicator
          size={40}
          left={0}
          top={0}
          style={style.refresh}
          status='loading'
        />
      </span>
    )
  }

  componentDidMount () {
    var elem = this.loading
    elem.style.opacity = 0
    window.requestAnimationFrame(function () {
      elem.style.transition = 'opacity 1500ms'
      elem.style.opacity = 1
    })
  }
}

export default LoadingIndicator
