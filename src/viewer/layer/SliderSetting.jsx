import React from 'react'
import { Slider, TextField } from 'material-ui'
import Setting from './Setting'
import getNext from '../../componentid'

const SliderSetting = ({title, icon, value, onChange}) =>
  <Setting>
    <div style={{position: 'relative', top: '21px', float: 'left'}}>{icon}</div>
    <div style={{position: 'relative', paddingLeft: '16px', top: '0px', height: '48px', width: '310px', float: 'left'}}>
      <TextField
        id={'tf' + getNext()}
        floatingLabelStyle={{position: 'absolute', top: '22px', left: '-40px'}}
        floatingLabelText={title}
        underlineShow={false}>
        <Slider
          min={0}
          max={1}
          step={0.05}
          value={value}
          onChange={(event, value) => onChange(value)}
          />
      </TextField>
    </div>
  </Setting>
export default SliderSetting
