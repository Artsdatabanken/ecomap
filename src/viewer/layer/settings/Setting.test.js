import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from '../../theme_jest'

import Setting from './Setting'

it('renders ok', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Setting><div /></Setting>
    </MuiThemeProvider>
)
  expect(tree.toJSON()).toMatchSnapshot()
})
