import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { muiTheme } from 'storybook-addon-material-ui'
import {Paper} from 'material-ui'
import theme from './theme'
import {NatureTag, SpeciesTag, YearTag, EnvironmentalTag} from './filtertag/FilterTag.story'
import SearchBar from './viewer/search/SearchBar'
import LeftMenu from './viewer/menu/LeftMenu.story'
import LoadingIndicator from './LoadingIndicator'
import ColorPickers from './stories/ColorPickers'
import CardStack from './viewer/layer/infocard/CardStack'
import AddLayer from './viewer/layer/add/AddLayer'
import SelectSpecies from './viewer/layer/add/species/SelectSpecies'
import ErrorBanner from './ErrorBanner'
import SpeciesGridItemCard from './viewer/layer/add/species/SpeciesGridItemCard'
import ArcStory from './stories/ArcStory'
import ScatterplotStory from './stories/ScatterplotStory'
import HexagonStoryLocal from './stories/HexagonStoryLocal'
import HeatMapLayerStory from './stories/HeatmapLayerStory'
import ExperimentalShaderStory from './stories/ExperimentalShaderStory'
import ColorRampStory from './stories/ColorRampStory'
import diagrams from './stories/Diagrams'
import layerSettings from './stories/layerSettings'

storiesOf('Layer rendering', module)
.addDecorator(muiTheme([theme]))
.add('Heatmap', () => <HeatMapLayerStory />)
.add('Arc', () =>
  <Paper style={{margin: '20px'}}>
    <ArcStory />
  </Paper>
)
.add('Experimental shader', () => <ExperimentalShaderStory />)
.add('Scatterplot', () => <ScatterplotStory />)
.add('HexagonLocal', () => <HexagonStoryLocal />)

layerSettings()

storiesOf('Layer Add', module)
.addDecorator(muiTheme([theme]))
.add('Species Card', () =>
  <div style={{ margin: 0, width: '20%' }}>
    <SpeciesGridItemCard tile={{
      id: 31241,
      scientificName: 'Alces alces',
      popularName: 'Elg',
      level: 9,
      imageAttribution: '(C)',
      imageUrl: 'https://farm5.staticflickr.com/4107/4839886016_d11b6d2cdf.jpg'
    }}
      onClick={action('onClick')} />
  </div>
)
.add('Select Species', () =>
  <div style={{ margin: 20, width: '70%' }}>
    <SelectSpecies onClick={action('onClick')} />
  </div>)
.add('Add Layer', () => <AddLayer onClick={action('onClick')} />)

storiesOf('Common', module)
  .addDecorator(muiTheme([theme]))
  .add('Error banner', () =>
    <ErrorBanner
      message="Can't load search results"
      onRetry={action('onRetry')}
    />
  )
  .add('Loading indicator', () =>
    <div style={{ margin: '20px' }}>
      <LoadingIndicator />
    </div>
  )

storiesOf('Colors', module)
  .addDecorator(muiTheme([theme]))
  .add('Color Ramps', () =>
    <ColorRampStory />
  )
  .add('Color Pickers', () =>
    <div style={{ margin: '20px' }}>
      <ColorPickers />
    </div>
  )

storiesOf('Menu', module)
  .addDecorator(muiTheme([theme]))
  .add('Left Menu', () =>
    <div style={{ margin: '20px' }}>
      <LeftMenu />
    </div>
  )
  .add('Card Stack', () =>
    <div style={{ margin: '20px' }}>
      <CardStack
        features={[
          { layer: { id: 'NIN T4' }, properties: { a: 'b' } },
          { layer: { id: 'NIN T44' }, properties: { a: 'b' } }
        ]}
      />
    </div>
  )

storiesOf('Search Bar', module).addDecorator(muiTheme()).add('primary', () =>
  <div style={{ margin: '20px' }}>
    <SearchBar />
  </div>
)

storiesOf('Filter', module)
  .addDecorator(muiTheme([theme]))
  .add('Filter string', () =>
    <div style={{display: 'flex', lineHeight: '52px', textAlign: 'center'}}>
      <SpeciesTag onRequestDelete={action('requestDelete')}>Moose</SpeciesTag> observed between the year
  <YearTag onRequestDelete={action('requestDelete')}>2000</YearTag> and
  <YearTag onRequestDelete={action('requestDelete')}>2010</YearTag> in
  <NatureTag onRequestDelete={action('requestDelete')}>Forests</NatureTag> at minimum
  <EnvironmentalTag onRequestDelete={action('requestDelete')}>600 m</EnvironmentalTag> above sea level
  </div>)

diagrams()
