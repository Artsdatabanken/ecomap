import React from 'react'
import renderer from 'react-test-renderer'
import muiTheme from '../../../../theme_jest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import TemporalHeatmapLayerSettings from './TemporalHeatmapLayerSettings'

it('renders ok', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <TemporalHeatmapLayerSettings fillOpacity={0.1} radiusScale={0.2} height={0.3} colorRamp='viridis' />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
