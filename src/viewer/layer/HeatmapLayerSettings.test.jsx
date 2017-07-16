import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HeatMapLayerSettings from './HeatmapLayerSettings'

it('loading standard tile', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <HeatMapLayerSettings fillOpacity={0.1} radius={0.2} coverage={0.3} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
