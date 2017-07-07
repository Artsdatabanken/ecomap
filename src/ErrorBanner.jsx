import React from 'react'
import FlatButton from 'material-ui/FlatButton'

const ErrorBanner = ({ message, onRetry }) =>
  <div
    style={{
      textAlign: 'center',
      width: '100%',
      height: '100%',
      verticalAlign: 'center'
    }}
  >
    <p>
      {message}
    </p>
    <FlatButton label='Retry' primary onTouchTap={e => onRetry()} />
  </div>

export default ErrorBanner
