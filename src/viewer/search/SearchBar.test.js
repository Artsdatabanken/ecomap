import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from '../../theme_jest'

import SearchBar from './SearchBar'

it('renders ok', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <SearchBar onUpdateSearch={() => {}} />
    </MuiThemeProvider>)
  expect(tree.toJSON()).toMatchSnapshot()
})
