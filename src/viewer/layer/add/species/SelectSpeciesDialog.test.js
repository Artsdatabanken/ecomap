import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import SelectSpeciesDialog from './SelectSpeciesDialog'

it('renders', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <SelectSpeciesDialog onAddLayer={() => {}} onClose={() => {}} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
