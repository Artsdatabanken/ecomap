import React from 'react'
import ActionOpacity from 'material-ui/svg-icons/action/opacity'
import ActionAspectRatio from 'material-ui/svg-icons/action/aspect-ratio'
import ActionAllOut from 'material-ui/svg-icons/action/all-out'
import SliderSetting from '../SliderSetting'
import ColorRamp from '../ColorRamp'

export default class HexagonLayerSettings extends React.Component {
  render () {
    const {fillOpacity, coverage, radius, elevationMin, elevationMax,
      lowerPercentile, colorRamp, upperPercentile, onChange} = this.props
    return (<div>
      <ColorRamp
        value={colorRamp}
        icon={<ActionOpacity />}
        onChange={value => onChange('colorRamp', value)}
        />
      <SliderSetting title='Opacity' value={fillOpacity} icon={<ActionOpacity />} onChange={value => onChange('fillOpacity', value)} />
      <SliderSetting title='Bin radius' value={radius} icon={<ActionAllOut />} onChange={value => onChange('radius', value)} />
      <SliderSetting title='Lower percentile' value={lowerPercentile} icon={<ActionAllOut />} onChange={value => onChange('lowerPercentile', value)} />
      <SliderSetting title='Upper percentile' value={upperPercentile} icon={<ActionAllOut />} onChange={value => onChange('upperPercentile', value)} />
      <SliderSetting title='Coverage' value={coverage} icon={<ActionAspectRatio />} onChange={value => onChange('coverage', value)} />
      <SliderSetting title='Elevation min' value={elevationMin} icon={<ActionAllOut />} onChange={value => onChange('elevationMin', value)} />
      <SliderSetting title='Elevation max' value={elevationMax} icon={<ActionAllOut />} onChange={value => onChange('elevationMax', value)} />
    </div>)
  }
}
