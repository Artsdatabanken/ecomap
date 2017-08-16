import React from 'react'
import { SelectField, MenuItem } from 'material-ui'
import getNext from '../../../componentid'
// import Setting from './Setting'

const ColorRamp = ({value, onChange}) =>
  <SelectField
    id={getNext()}
    floatingLabelText='Color ramp'
    value={value}
    onChange={(event, index, value) => onChange(value)}
  >
    <MenuItem value='inferno' primaryText='Inferno' />
    <MenuItem value='magma' primaryText='Magma' />
    <MenuItem value='plasma' primaryText='Plasma' />
    <MenuItem value='viridis' primaryText='Viridis' />
  </SelectField>

export default ColorRamp
