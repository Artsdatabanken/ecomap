import React from 'react'
import renderer from 'react-test-renderer'
import muiTheme from '../../../../theme_jest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HeatmapLayerSettings from './HexagonLayerSettings'

it('renders ok', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <HeatmapLayerSettings fillOpacity={0.1} radiusScale={0.2} height={0.3} colorRamp='viridis' />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
