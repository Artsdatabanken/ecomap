import React from 'react'
import renderer from 'react-test-renderer'
import muiTheme from '../../../../theme_jest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ScatterplotLayerSettings from './ScatterplotLayerSettings'

it('loading standard tile', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <ScatterplotLayerSettings
        fillColor={'#ff8040'}
        fillOpacity={0.1}
        radiusScale={0.2}
      />
    </MuiThemeProvider>
  )
  expect(tree.toJSON()).toMatchSnapshot()
})
