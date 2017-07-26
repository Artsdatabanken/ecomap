import React from 'react'
import HexagonLayerSettings from './HexagonLayerSettings'
import ScatterplotLayerSettings from './ScatterplotLayerSettings'

const CustomLayerSettings = (props) => {
  switch (props.renderMethod) {
    case 'scatterplot' : return <ScatterplotLayerSettings {...props} />
    case 'hexagon' : return <HexagonLayerSettings {...props} />
    default: return <div>{this.props.renderMethod}</div>
  }
}

export default CustomLayerSettings
