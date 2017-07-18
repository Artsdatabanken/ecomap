import React from 'react'
import ActionOpacity from 'material-ui/svg-icons/action/opacity'
import ActionAspectRation from 'material-ui/svg-icons/action/aspect-ratio'
import ActionAllOut from 'material-ui/svg-icons/action/all-out'
import SliderSetting from './SliderSetting'

export default class Bars3DLayerSettings extends React.Component {
  render () {
    const {fillOpacity, coverage, radius} = this.props
    return (<div>
      <SliderSetting title='Opacity' value={fillOpacity} icon={<ActionOpacity />} onChange={value => this.props.onChange('fillOpacity', value)} />
      <SliderSetting title='Coverage' value={coverage} icon={<ActionAspectRation />} onChange={value => this.props.onChange('coverage', value)} />
      <SliderSetting title='Radius' value={radius} icon={<ActionAllOut />} onChange={value => this.props.onChange('radius', value)} />
    </div>)
  }
}
