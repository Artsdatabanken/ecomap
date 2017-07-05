import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import SelectSpeciesDialog from './SelectSpeciesDialog'

it('renders empty ok', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <SelectSpeciesDialog />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
