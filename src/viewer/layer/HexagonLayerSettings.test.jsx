import React from 'react'
import renderer from 'react-test-renderer'
import muiTheme from '../../theme_jest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HexagonLayerSettings from './HexagonLayerSettings'

it('loading standard tile', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <HexagonLayerSettings fillOpacity={0.1} radius={0.2} coverage={0.3} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
