import React from 'react'
import { Slider } from 'material-ui'
import Setting from './Setting'
import getNext from '../../../componentid'

const SliderSetting = ({ title, icon, value, onChange }) =>
  <Setting title={title} icon={icon}>
    <Slider
      sliderStyle={{marginTop: '6px', marginBottom: '0px'}}
      min={0}
      max={1}
      step={0.01}
      value={value}
      onChange={(event, value) => onChange(value)}
      id={getNext()}
      />
  </Setting>
export default SliderSetting
