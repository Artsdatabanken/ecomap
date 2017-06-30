import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import SearchBar from './SearchBar'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

it('renders ok', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MuiThemeProvider>
      <SearchBar onUpdateSearch={() => {}} />
    </MuiThemeProvider>
, div)
})
