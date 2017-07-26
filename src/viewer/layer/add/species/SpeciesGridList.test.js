import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from '../../../../theme_jest'

import SpeciesGridList from './SpeciesGridList'

const loadingTile = {
  id: 2342,
  scientificName: 'Alces Alces',
  level: 4,
  popularName: 'Elg'
}
let loadedFeaturedTile = { ...loadingTile }
loadedFeaturedTile.id = 2343
loadedFeaturedTile.imageUrl = 'http://elg.no'
loadedFeaturedTile.imageAttribution = 'CCBY'
loadedFeaturedTile.imageScientificName = 'xAlces'

it('loaded tiles', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <SpeciesGridList species={[loadingTile, loadedFeaturedTile]} />
    </MuiThemeProvider>
  )
  expect(tree.toJSON()).toMatchSnapshot()
})

it('still loading', () => {
  const tree = renderer.create(
    <MuiThemeProvider muiTheme={muiTheme}>
      <SpeciesGridList species={[]} />
    </MuiThemeProvider>
  )
  expect(tree.toJSON()).toMatchSnapshot()
})
