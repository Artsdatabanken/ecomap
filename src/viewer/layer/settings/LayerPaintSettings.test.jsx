import React from 'react'
import renderer from 'react-test-renderer'
import muiTheme from '../../../theme_jest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import LayerPaintSettings from './LayerPaintSettings'

it('renders ok', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <LayerPaintSettings
        visualizationMode='heatmap'
        blendMode='multiply'
        fillOpacity={0.1}
        radius={0.2}
        coverage={0.3} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
