import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Bars3DLayerSettings from './Bars3DLayerSettings'

it('loading standard tile', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <Bars3DLayerSettings fillOpacity={0.1} radius={0.2} coverage={0.3} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
