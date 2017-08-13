import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from '../../theme_jest'

import SliderSetting from '../SliderSetting'

it('renders ok', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <SliderSetting title='title' icon='' value={0.1} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
