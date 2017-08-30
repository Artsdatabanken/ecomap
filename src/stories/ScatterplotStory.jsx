import React from 'react'
import FetchContainer from '../FetchContainer'
import MapLayerStack from '../map/layer/MapLayerStack'

const viewport = {
  width: 900,
  height: 800,
  longitude: 9,
  latitude: 64,
  zoom: 4,
  pitch: 0,
  bearing: 0
}
const layers = {
  61840: {
    'id': 61840,
    'title': 'Primula stricta',
    'subTitle': 'smalnøkleblom (Karplanter)',
    'imageUrl': 'https://farm8.staticflickr.com/7376/8859158303_ff6d08b320.jpg',
    'dataUrl': 'http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/61840/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=101880',
    'infoUrl': 'http://artsdatabanken.no/Taxon/61840',
    'source': 'geojson',
    'visible': true,
    'raster': false,
    'paint': {
      'visualizationMode': 'scatterplot',
      'fillColor': '#3A92E3',
      'fillOpacity': 1,
      'coverage': 1,
      'colorRamp': 'inferno',
      'blendMode': 'multiply',
      'radiusScale': 0.88,
      'height': 0.35,
      'extruded': true,
      'elevationScale': 500,
      'lowerPercentile': 1,
      'upperPercentile': 1,
      'elevationMin': 0,
      'elevationMax': 0.5,
      'colorDomainMin': 0,
      'colorDomainMax': 1
    }
  }
}

export default ScatterplotStory =>
  <FetchContainer>
    <MapLayerStack layers={layers} viewport={viewport} />
  </FetchContainer>
