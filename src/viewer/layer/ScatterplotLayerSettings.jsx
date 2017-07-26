import React from 'react'
import ActionAllOut from 'material-ui/svg-icons/action/all-out'
import SliderSetting from './SliderSetting'

export default class HexagonLayerSettings extends React.Component {
  render () {
    const {radius, onChange} = this.props
    return (<div>
      <SliderSetting
        title='Radius'
        value={radius}
        icon={<ActionAllOut />}
        onChange={value => onChange('radius', value)} />
    </div>)
  }
}
