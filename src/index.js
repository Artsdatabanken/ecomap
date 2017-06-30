import injectTapEventPlugin from 'react-tap-event-plugin'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// #{process.env.REACT_APP_BASENAME}#

ReactDOM.render(<App />, document.getElementById('root'))
