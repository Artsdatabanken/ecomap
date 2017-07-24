import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { muiTheme } from 'storybook-addon-material-ui'

import FilterTag from './filtertag/FilterTag.story'
import SearchBar from './viewer/search/SearchBar'
import LeftMenu from './viewer/menu/LeftMenu.story'
import LoadingIndicator from './LoadingIndicator'
import ActiveLayers from './viewer/layer/ActiveLayers'
import ColorPickers from './stories/ColorPickers'
import diagrams from './stories/Diagrams'
import ColorRamp from './graphics/color/ColorRamp'
import CardStack from './viewer/layer/infocard/CardStack'
import AddLayer from './viewer/layer/add/AddLayer'
import SelectSpecies from './viewer/layer/add/species/SelectSpecies'
import ErrorBanner from './ErrorBanner'
import SpeciesGridItemCard from './viewer/layer/add/species/SpeciesGridItemCard'
import theme from './theme'
import HexagonLayerSettings from './viewer/layer/HexagonLayerSettings'
import ScatterplotLayerSettings from './viewer/layer/ScatterplotLayerSettings'
import {viridis} from './graphics/color/ramps'

diagrams()

storiesOf('Common')
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
  .add('RGB', () => {

  })
  .add('Color ramps', () =>
    <div style={{ margin: '20px' }}>
      <ColorRamp steps={['#000000', '#ffffff']} />
      <ColorRamp steps={['#000000', '#0000ff', '#ffffff']} />
      <ColorRamp steps={['#000000', '#00ff00', '#ffff00', '#ffffff']} />
      <ColorRamp steps={['#0000ff', '#ffff00']} />
      <ColorRamp
        steps={viridis}
      />
    </div>
  )
  .add('Color pickers', () =>
    <div style={{ margin: '20px' }}>
      <ColorPickers />
    </div>
  )

let layers = {'31241': {'id': 31241,
  'title': 'Alces alces',
  'subTitle': 'elg',
  'imageUrl': 'https://farm5.staticflickr.com/4107/4839886016_d11b6d2cdf.jpg',
  'dataUrl': 'http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/31241/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=48103',
  'source': 'geojson',
  'visible': true,
  'raster': false,
  'paint': {'fillColor': '#ff0000', 'fillOpacity': 1, 'renderMethod': 'heatmap', 'blendMode': 'multiply'}}}

storiesOf('Layer settings', module).addDecorator(muiTheme()).add('primary', () =>
  <div style={{ margin: '20px' }}>
    <ActiveLayers layers={layers} />
  </div>
).add('Scatterplot', () => {
  let paint = {
    'fillColor': '#ff0000',
    'coverage': 0.95,
    'fillOpacity': 1.0,
    'radius': 1.0,
    'renderMethod': 'hexagon',
    'blendMode': 'multiply'
  }
  return <div style={{width: '400px', padding: '20px'}}>
    <ScatterplotLayerSettings {...paint} onChange={action('onUpdateLayerProp')} />
  </div>
}).add('Hexagon', () => {
  let paint = {
    'fillColor': '#ff0000',
    'coverage': 0.95,
    'fillOpacity': 1.0,
    'radius': 1.0,
    'renderMethod': 'hexagon',
    'blendMode': 'multiply'
  }
  return <div style={{width: '400px', padding: '20px'}}>
    <HexagonLayerSettings {...paint} onChange={action('onUpdateLayerProp')} />
  </div>
})

storiesOf('Add Layer', module)
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
.add('Add layer', () => <AddLayer onClick={action('onClick')} />)

storiesOf('Menu', module)
  .addDecorator(muiTheme([theme]))
  .add('Left Menu', () =>
    <div style={{ margin: '20px' }}>
      <LeftMenu />
    </div>
  )
  .add('CardStack', () =>
    <div style={{ margin: '20px' }}>
      <CardStack
        features={[
          { layer: { id: 'NIN T4' }, properties: { a: 'b' } },
          { layer: { id: 'NIN T44' }, properties: { a: 'b' } }
        ]}
      />
    </div>
  )

storiesOf('SearchBar', module).addDecorator(muiTheme()).add('primary', () =>
  <div style={{ margin: '20px' }}>
    <SearchBar />
  </div>
)

storiesOf('FilterTag', module)
  .addDecorator(muiTheme([theme]))
  .add('primary', () =>
    <div>
      <FilterTag onRequestDelete={action('requestDelete')}>Troms</FilterTag>
      <FilterTag onRequestDelete={action('requestDelete')}>
        Finnmark
      </FilterTag>&nbsp;
      <FilterTag onRequestDelete={action('requestDelete')}>
        Viridis{' '}
        <ColorRamp
          steps={viridis}
        />
      </FilterTag>&nbsp;
    </div>
  )
