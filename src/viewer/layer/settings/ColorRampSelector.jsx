import React from 'react'
import { SelectField, MenuItem } from 'material-ui'
import getNext from '../../../componentid'
// import Setting from './Setting'
import ColorRamp from '../../../graphics/color/ColorRamp'
import ramp from '../../../graphics/color/ramps/'

const ColorRampSelector = ({value, onChange}) =>
  <SelectField
    id={getNext()}
    floatingLabelText='Color ramp'
    value={value}
    onChange={(event, index, value) => onChange(value)}
    style={{width: 308}}
  >
    {ramp.ramps.map(id =>
      <MenuItem
        innerDivStyle={{paddingTop: 8, marginBottom: 8, lineHeight: 1}}
        key={id}
        value={id}
        primaryText={id}
        secondaryText={<ColorRamp steps={ramp.toHex(ramp[id])} />} />
    )}
    <MenuItem disabled value='custom' primaryText='Customize...' />
  </SelectField>

export default ColorRampSelector
