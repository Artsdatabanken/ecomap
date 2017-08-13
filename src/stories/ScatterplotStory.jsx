import React from 'react'
import Scatterplot from '../map/layer/Scatterplot'
import ArtskartDataSourceContainer from '../map/layer/ArtskartDataSourceContainer'
import FetchContainer from '../FetchContainer'

const viewport = {
  width: 900,
  height: 800,
  longitude: 9,
  latitude: 64,
  zoom: 4,
  pitch: 0,
  bearing: 0
}

export default ScatterplotStory =>
  <FetchContainer>
    <ArtskartDataSourceContainer
      dataUrl='http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/31241/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=48103'>
      <Scatterplot
        fillColor='#100060'
        fillOpacity={0.4}
        radius={0.5}
        viewport={viewport} />
    </ArtskartDataSourceContainer>
  </FetchContainer>
