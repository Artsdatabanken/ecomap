import React from 'react'
import { Slider } from 'material-ui'
import Setting from './Setting'

const SliderSetting = ({title, icon, value, onChange}) =>
  <Setting>
    <div>{title}</div>
    <div style={{position: 'relative', top: '5px', float: 'left'}}>{icon}</div>
    <div style={{position: 'relative', paddingLeft: '16px', top: '-16px', height: '48px', width: '310px', float: 'left'}}>
      <Slider
        min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(event, value) => onChange(value)}
        />
    </div>
  </Setting>
export default SliderSetting
