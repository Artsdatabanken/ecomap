import React from 'react'
import renderer from 'react-test-renderer'
import muiTheme from '../../theme_jest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ActiveLayerStrip from './ActiveLayerStrip'

it('renders ok', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <ActiveLayerStrip paint={{fillColor: '#ff0044', fillOpacity: 0.1, radius: 0.2, coverage: 0.3}} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
