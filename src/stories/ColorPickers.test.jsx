import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ColorPickers from './ColorPickers'

it('loading standard tile', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <ColorPickers />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
