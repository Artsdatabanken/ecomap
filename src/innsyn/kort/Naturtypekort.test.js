import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Naturtypekort from './Naturtypekort'

it('renders correctly', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <Naturtypekort ninkode='T44' properties={{ a: 1 }} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
