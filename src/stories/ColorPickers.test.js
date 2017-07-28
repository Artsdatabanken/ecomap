import React from 'react'
import renderer from 'react-test-renderer'
import muiTheme from '../theme_jest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ColorPickers from './ColorPickers'

it('renders', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <ColorPickers />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
