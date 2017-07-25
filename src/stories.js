import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { muiTheme } from 'storybook-addon-material-ui'
import {Paper} from 'material-ui'
import theme from './theme'
import {FilterTag, NatureTag, SpeciesTag, YearTag, EnvironmentalTag} from './filtertag/FilterTag.story'
import SearchBar from './viewer/search/SearchBar'
import LeftMenu from './viewer/menu/LeftMenu.story'
import LoadingIndicator from './LoadingIndicator'
import ColorPickers from './stories/ColorPickers'
import ColorRamp from './graphics/color/ColorRamp'
import CardStack from './viewer/layer/infocard/CardStack'
import AddLayer from './viewer/layer/add/AddLayer'
import SelectSpecies from './viewer/layer/add/species/SelectSpecies'
import ErrorBanner from './ErrorBanner'
import SpeciesGridItemCard from './viewer/layer/add/species/SpeciesGridItemCard'
import {viridis} from './graphics/color/ramps'
import ArcStory from './stories/ArcStory'
import ScatterplotStory from './stories/ScatterplotStory'
import diagrams from './stories/Diagrams'
import layerSettings from './stories/layerSettings'

storiesOf('Layer rendering')
.addDecorator(muiTheme([theme]))
.add('Arc', () =>
  <Paper style={{margin: '20px'}}>
    <ArcStory />
  </Paper>
)
.add('Scatterplot', () => <ScatterplotStory />)

layerSettings()

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
      <FilterTag onRequestDelete={action('requestDelete')}>
        <ColorRamp
          steps={viridis}
        />
      </FilterTag>
    </div>
).add('search criteria', () =>
  <div style={{display: 'flex', lineHeight: '52px', textAlign: 'center'}}>
    <SpeciesTag onRequestDelete={action('requestDelete')}>Moose</SpeciesTag> observed between the year
  <YearTag onRequestDelete={action('requestDelete')}>2000</YearTag> and
  <YearTag onRequestDelete={action('requestDelete')}>2010</YearTag> in
  <NatureTag onRequestDelete={action('requestDelete')}>Forests</NatureTag> at minimum altitude of
  <EnvironmentalTag onRequestDelete={action('requestDelete')}>600 m</EnvironmentalTag>
  </div>)

diagrams()
