import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ScatterplotLayerSettings from './ScatterplotLayerSettings'

it('loading standard tile', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <ScatterplotLayerSettings fillOpacity={0.1} radius={0.2} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
