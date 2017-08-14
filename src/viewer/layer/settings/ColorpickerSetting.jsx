import React from 'react'
import { SketchPicker } from 'react-color'
import { hexToRgba } from '../../../graphics/color/colorfunc'
import Label from './Label'

const presetColors = ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
  '#FF0088', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000',
  '#4A4A4A', '#9B9B9B', '#FFFFFF']

const ColorPickerSetting = ({ onChange, fillColor, fillOpacity, children }) =>
  <div>
    <Label>Color</Label>
    <div style={{ position: 'relative', left: 0, marginTop: '8px', marginRight: '24px' }}>
      <SketchPicker
        presetColors={presetColors}
        onChange={e => {
          onChange('fillColor', e.hex)
          onChange('fillOpacity', e.rgb.a)
        }}
        color={hexToRgba(fillColor, fillOpacity)}
        width='100%'
    />
    </div>
  </div>

export default ColorPickerSetting
