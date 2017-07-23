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
import Linjediagram from './viewer/diagram/Linjediagram'
import Søylediagram from './viewer/diagram/Søylediagram'
import ColorRamp from './graphics/color/ColorRamp'
import CardStack from './viewer/layer/infocard/CardStack'
import AddLayer from './viewer/layer/add/AddLayer'
import SelectSpecies from './viewer/layer/add/species/SelectSpecies'
import ErrorBanner from './ErrorBanner'
import SpeciesGridItemCard from './viewer/layer/add/species/SpeciesGridItemCard'
import theme from './theme'
import HexagonLayerSettings from './viewer/layer/HexagonLayerSettings'
import ScatterplotLayerSettings from './viewer/layer/ScatterplotLayerSettings'

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
]

const viridis = [
  '#440154',
  '#440256',
  '#450457',
  '#450559',
  '#46075a',
  '#46085c',
  '#460a5d',
  '#460b5e',
  '#470d60',
  '#470e61',
  '#471063',
  '#471164',
  '#471365',
  '#481467',
  '#481668',
  '#481769',
  '#48186a',
  '#481a6c',
  '#481b6d',
  '#481c6e',
  '#481d6f',
  '#481f70',
  '#482071',
  '#482173',
  '#482374',
  '#482475',
  '#482576',
  '#482677',
  '#482878',
  '#482979',
  '#472a7a',
  '#472c7a',
  '#472d7b',
  '#472e7c',
  '#472f7d',
  '#46307e',
  '#46327e',
  '#46337f',
  '#463480',
  '#453581',
  '#453781',
  '#453882',
  '#443983',
  '#443a83',
  '#443b84',
  '#433d84',
  '#433e85',
  '#423f85',
  '#424086',
  '#424186',
  '#414287',
  '#414487',
  '#404588',
  '#404688',
  '#3f4788',
  '#3f4889',
  '#3e4989',
  '#3e4a89',
  '#3e4c8a',
  '#3d4d8a',
  '#3d4e8a',
  '#3c4f8a',
  '#3c508b',
  '#3b518b',
  '#3b528b',
  '#3a538b',
  '#3a548c',
  '#39558c',
  '#39568c',
  '#38588c',
  '#38598c',
  '#375a8c',
  '#375b8d',
  '#365c8d',
  '#365d8d',
  '#355e8d',
  '#355f8d',
  '#34608d',
  '#34618d',
  '#33628d',
  '#33638d',
  '#32648e',
  '#32658e',
  '#31668e',
  '#31678e',
  '#31688e',
  '#30698e',
  '#306a8e',
  '#2f6b8e',
  '#2f6c8e',
  '#2e6d8e',
  '#2e6e8e',
  '#2e6f8e',
  '#2d708e',
  '#2d718e',
  '#2c718e',
  '#2c728e',
  '#2c738e',
  '#2b748e',
  '#2b758e',
  '#2a768e',
  '#2a778e',
  '#2a788e',
  '#29798e',
  '#297a8e',
  '#297b8e',
  '#287c8e',
  '#287d8e',
  '#277e8e',
  '#277f8e',
  '#27808e',
  '#26818e',
  '#26828e',
  '#26828e',
  '#25838e',
  '#25848e',
  '#25858e',
  '#24868e',
  '#24878e',
  '#23888e',
  '#23898e',
  '#238a8d',
  '#228b8d',
  '#228c8d',
  '#228d8d',
  '#218e8d',
  '#218f8d',
  '#21908d',
  '#21918c',
  '#20928c',
  '#20928c',
  '#20938c',
  '#1f948c',
  '#1f958b',
  '#1f968b',
  '#1f978b',
  '#1f988b',
  '#1f998a',
  '#1f9a8a',
  '#1e9b8a',
  '#1e9c89',
  '#1e9d89',
  '#1f9e89',
  '#1f9f88',
  '#1fa088',
  '#1fa188',
  '#1fa187',
  '#1fa287',
  '#20a386',
  '#20a486',
  '#21a585',
  '#21a685',
  '#22a785',
  '#22a884',
  '#23a983',
  '#24aa83',
  '#25ab82',
  '#25ac82',
  '#26ad81',
  '#27ad81',
  '#28ae80',
  '#29af7f',
  '#2ab07f',
  '#2cb17e',
  '#2db27d',
  '#2eb37c',
  '#2fb47c',
  '#31b57b',
  '#32b67a',
  '#34b679',
  '#35b779',
  '#37b878',
  '#38b977',
  '#3aba76',
  '#3bbb75',
  '#3dbc74',
  '#3fbc73',
  '#40bd72',
  '#42be71',
  '#44bf70',
  '#46c06f',
  '#48c16e',
  '#4ac16d',
  '#4cc26c',
  '#4ec36b',
  '#50c46a',
  '#52c569',
  '#54c568',
  '#56c667',
  '#58c765',
  '#5ac864',
  '#5cc863',
  '#5ec962',
  '#60ca60',
  '#63cb5f',
  '#65cb5e',
  '#67cc5c',
  '#69cd5b',
  '#6ccd5a',
  '#6ece58',
  '#70cf57',
  '#73d056',
  '#75d054',
  '#77d153',
  '#7ad151',
  '#7cd250',
  '#7fd34e',
  '#81d34d',
  '#84d44b',
  '#86d549',
  '#89d548',
  '#8bd646',
  '#8ed645',
  '#90d743',
  '#93d741',
  '#95d840',
  '#98d83e',
  '#9bd93c',
  '#9dd93b',
  '#a0da39',
  '#a2da37',
  '#a5db36',
  '#a8db34',
  '#aadc32',
  '#addc30',
  '#b0dd2f',
  '#b2dd2d',
  '#b5de2b',
  '#b8de29',
  '#bade28',
  '#bddf26',
  '#c0df25',
  '#c2df23',
  '#c5e021',
  '#c8e020',
  '#cae11f',
  '#cde11d',
  '#d0e11c',
  '#d2e21b',
  '#d5e21a',
  '#d8e219',
  '#dae319',
  '#dde318',
  '#dfe318',
  '#e2e418',
  '#e5e419',
  '#e7e419',
  '#eae51a',
  '#ece51b',
  '#efe51c',
  '#f1e51d',
  '#f4e61e',
  '#f6e620',
  '#f8e621',
  '#fbe723',
  '#fde725'
]
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

storiesOf('Diagram', module)
  .add('Søyle', () =>
    <div>
      <h3>Søylediagram</h3>
      <Søylediagram data={data} />
    </div>
  )
  .add('Linje', () =>
    <div style={{ margin: '20px' }}>
      <Linjediagram data={data} />
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
          steps={[
            '#440154',
            '#440256',
            '#450457',
            '#450559',
            '#46075a',
            '#46085c',
            '#460a5d',
            '#460b5e',
            '#470d60',
            '#470e61',
            '#471063',
            '#471164',
            '#471365',
            '#481467',
            '#481668',
            '#481769',
            '#48186a',
            '#481a6c',
            '#481b6d',
            '#481c6e',
            '#481d6f',
            '#481f70',
            '#482071',
            '#482173',
            '#482374',
            '#482475',
            '#482576',
            '#482677',
            '#482878',
            '#482979',
            '#472a7a',
            '#472c7a',
            '#472d7b',
            '#472e7c',
            '#472f7d',
            '#46307e',
            '#46327e',
            '#46337f',
            '#463480',
            '#453581',
            '#453781',
            '#453882',
            '#443983',
            '#443a83',
            '#443b84',
            '#433d84',
            '#433e85',
            '#423f85',
            '#424086',
            '#424186',
            '#414287',
            '#414487',
            '#404588',
            '#404688',
            '#3f4788',
            '#3f4889',
            '#3e4989',
            '#3e4a89',
            '#3e4c8a',
            '#3d4d8a',
            '#3d4e8a',
            '#3c4f8a',
            '#3c508b',
            '#3b518b',
            '#3b528b',
            '#3a538b',
            '#3a548c',
            '#39558c',
            '#39568c',
            '#38588c',
            '#38598c',
            '#375a8c',
            '#375b8d',
            '#365c8d',
            '#365d8d',
            '#355e8d',
            '#355f8d',
            '#34608d',
            '#34618d',
            '#33628d',
            '#33638d',
            '#32648e',
            '#32658e',
            '#31668e',
            '#31678e',
            '#31688e',
            '#30698e',
            '#306a8e',
            '#2f6b8e',
            '#2f6c8e',
            '#2e6d8e',
            '#2e6e8e',
            '#2e6f8e',
            '#2d708e',
            '#2d718e',
            '#2c718e',
            '#2c728e',
            '#2c738e',
            '#2b748e',
            '#2b758e',
            '#2a768e',
            '#2a778e',
            '#2a788e',
            '#29798e',
            '#297a8e',
            '#297b8e',
            '#287c8e',
            '#287d8e',
            '#277e8e',
            '#277f8e',
            '#27808e',
            '#26818e',
            '#26828e',
            '#26828e',
            '#25838e',
            '#25848e',
            '#25858e',
            '#24868e',
            '#24878e',
            '#23888e',
            '#23898e',
            '#238a8d',
            '#228b8d',
            '#228c8d',
            '#228d8d',
            '#218e8d',
            '#218f8d',
            '#21908d',
            '#21918c',
            '#20928c',
            '#20928c',
            '#20938c',
            '#1f948c',
            '#1f958b',
            '#1f968b',
            '#1f978b',
            '#1f988b',
            '#1f998a',
            '#1f9a8a',
            '#1e9b8a',
            '#1e9c89',
            '#1e9d89',
            '#1f9e89',
            '#1f9f88',
            '#1fa088',
            '#1fa188',
            '#1fa187',
            '#1fa287',
            '#20a386',
            '#20a486',
            '#21a585',
            '#21a685',
            '#22a785',
            '#22a884',
            '#23a983',
            '#24aa83',
            '#25ab82',
            '#25ac82',
            '#26ad81',
            '#27ad81',
            '#28ae80',
            '#29af7f',
            '#2ab07f',
            '#2cb17e',
            '#2db27d',
            '#2eb37c',
            '#2fb47c',
            '#31b57b',
            '#32b67a',
            '#34b679',
            '#35b779',
            '#37b878',
            '#38b977',
            '#3aba76',
            '#3bbb75',
            '#3dbc74',
            '#3fbc73',
            '#40bd72',
            '#42be71',
            '#44bf70',
            '#46c06f',
            '#48c16e',
            '#4ac16d',
            '#4cc26c',
            '#4ec36b',
            '#50c46a',
            '#52c569',
            '#54c568',
            '#56c667',
            '#58c765',
            '#5ac864',
            '#5cc863',
            '#5ec962',
            '#60ca60',
            '#63cb5f',
            '#65cb5e',
            '#67cc5c',
            '#69cd5b',
            '#6ccd5a',
            '#6ece58',
            '#70cf57',
            '#73d056',
            '#75d054',
            '#77d153',
            '#7ad151',
            '#7cd250',
            '#7fd34e',
            '#81d34d',
            '#84d44b',
            '#86d549',
            '#89d548',
            '#8bd646',
            '#8ed645',
            '#90d743',
            '#93d741',
            '#95d840',
            '#98d83e',
            '#9bd93c',
            '#9dd93b',
            '#a0da39',
            '#a2da37',
            '#a5db36',
            '#a8db34',
            '#aadc32',
            '#addc30',
            '#b0dd2f',
            '#b2dd2d',
            '#b5de2b',
            '#b8de29',
            '#bade28',
            '#bddf26',
            '#c0df25',
            '#c2df23',
            '#c5e021',
            '#c8e020',
            '#cae11f',
            '#cde11d',
            '#d0e11c',
            '#d2e21b',
            '#d5e21a',
            '#d8e219',
            '#dae319',
            '#dde318',
            '#dfe318',
            '#e2e418',
            '#e5e419',
            '#e7e419',
            '#eae51a',
            '#ece51b',
            '#efe51c',
            '#f1e51d',
            '#f4e61e',
            '#f6e620',
            '#f8e621',
            '#fbe723',
            '#fde725'
          ]}
        />
      </FilterTag>&nbsp;
    </div>
  )
