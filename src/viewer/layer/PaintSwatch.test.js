import React from 'react'
import renderer from 'react-test-renderer'
import muiTheme from '../../theme_jest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import PaintSwatch from './PaintSwatch'

it('loading standard tile', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <PaintSwatch color='#ffeedd' />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
