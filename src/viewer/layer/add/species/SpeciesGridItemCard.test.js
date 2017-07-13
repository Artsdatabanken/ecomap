import React from 'react'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import SpeciesGridItemCard from './SpeciesGridItemCard'

const loadingTile = {
  id: 2342,
  scientificName: 'Alces Alces',
  level: 4,
  popularName: 'Elg'
}
const loadedFeaturedTile = {
  ...loadingTile,
  imageUrl: 'http://elg.no',
  imageAttribution: 'CCBY',
  imageScientificName: 'xAlces'
}

it('loading standard tile', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <SpeciesGridItemCard tile={loadingTile} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})

it('complete featured tile', () => {
  const tree = renderer.create(
    <MuiThemeProvider>
      <SpeciesGridItemCard tile={loadedFeaturedTile} />
    </MuiThemeProvider>
      )
  expect(tree.toJSON()).toMatchSnapshot()
})
