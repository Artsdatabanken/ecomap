import React from 'react'
import ActionOpacity from 'material-ui/svg-icons/action/opacity'
import ActionAspectRatio from 'material-ui/svg-icons/action/aspect-ratio'
import ActionAllOut from 'material-ui/svg-icons/action/all-out'
import SliderSetting from '../SliderSetting'
import ColorRampSelector from '../ColorRampSelector'

export default class HexagonLayerSettings extends React.Component {
  render () {
    const {fillOpacity, coverage, radiusScale, elevationMin, elevationMax,
      lowerPercentile, colorRamp, upperPercentile, colorDomainMin, colorDomainMax, onChange} = this.props
    return (<div>
      <ColorRampSelector
        value={colorRamp}
        icon={<ActionOpacity />}
        onChange={value => onChange('colorRamp', value)}
        />
      <SliderSetting title='Opacity' value={fillOpacity} icon={<ActionOpacity />} onChange={value => onChange('fillOpacity', value)} />
      <SliderSetting title='Bin radius' value={radiusScale} icon={<ActionAllOut />} onChange={value => onChange('radiusScale', value)} />
      <SliderSetting title='Lower percentile filter' value={lowerPercentile} icon={<ActionAllOut />} onChange={value => onChange('lowerPercentile', value)} />
      <SliderSetting title='Upper percentile filter' value={upperPercentile} icon={<ActionAllOut />} onChange={value => onChange('upperPercentile', value)} />
      <SliderSetting title='Hexagon coverage %' value={coverage} icon={<ActionAspectRatio />} onChange={value => onChange('coverage', value)} />
      <SliderSetting title='Elevation min' value={elevationMin} icon={<ActionAllOut />} onChange={value => onChange('elevationMin', value)} />
      <SliderSetting title='Elevation max' value={elevationMax} icon={<ActionAllOut />} onChange={value => onChange('elevationMax', value)} />
      <SliderSetting title='Color domain min' value={colorDomainMin} icon={<ActionAllOut />} onChange={value => onChange('colorDomainMin', value)} />
      <SliderSetting title='Color domain max' value={colorDomainMax} icon={<ActionAllOut />} onChange={value => onChange('colorDomainMax', value)} />
    </div>)
  }
}
