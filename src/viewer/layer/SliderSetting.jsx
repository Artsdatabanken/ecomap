import React from 'react'
import { Slider, Divider } from 'material-ui'

const SliderSetting = ({title, icon, value, onChange}) =>
  <div>
    <div style={{display: 'inline-block', marginLeft: '24px', marginRight: '24px', marginTop: '8px', height: '58px'}}>
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
    </div>
    <Divider />
  </div>
export default SliderSetting
