import React from 'react'
import ActionAllOut from 'material-ui/svg-icons/action/all-out'
import ActionOpacity from 'material-ui/svg-icons/action/opacity'
import SliderSetting from '../SliderSetting'
import ColorRampSelector from '../ColorRampSelector'

export default class HeatmapLayerSettings extends React.Component {
  render () {
    const { colorRamp, weekNo, height, fillOpacity, onChange } = this.props
    return (
      <div>
        <ColorRampSelector
          value={colorRamp}
          icon={<ActionOpacity />}
          onChange={value => onChange('colorRamp', value)}
        />
        <SliderSetting
          title='Week number'
          value={weekNo}
          icon={<ActionAllOut />}
          onChange={value => onChange('weekNo', value)}
        />
        <SliderSetting
          title='Peak height'
          value={height}
          icon={<ActionAllOut />}
          onChange={value => onChange('height', value)}
        />
        <SliderSetting
          title='Opacity'
          value={fillOpacity}
          icon={<ActionOpacity />}
          onChange={value => onChange('fillOpacity', value)}
        />
      </div>
    )
  }
}
