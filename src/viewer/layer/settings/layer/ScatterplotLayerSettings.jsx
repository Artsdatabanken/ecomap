import React from 'react'
import ActionAllOut from 'material-ui/svg-icons/action/all-out'
import SliderSetting from '../SliderSetting'
import ColorpickerSetting from '../ColorpickerSetting'

export default class ScatterplotLayerSettings extends React.Component {
  render () {
    const { radiusScale, onChange, fillColor, fillOpacity } = this.props
    return (
      <div>
        <SliderSetting
          title='Radius'
          value={radiusScale}
          icon={<ActionAllOut />}
          onChange={value => onChange('radiusScale', value)}
        />
        <ColorpickerSetting
          onChange={onChange}
          fillColor={fillColor}
          fillOpacity={fillOpacity}
        />
      </div>
    )
  }
}
