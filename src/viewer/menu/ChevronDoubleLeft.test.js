import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import renderer from 'react-test-renderer'

import ChevronDoubleLeft from './ChevronDoubleLeft'

it('renders ok', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <ChevronDoubleLeft />
    </MuiThemeProvider>)
  expect(tree).toMatchSnapshot()
})
