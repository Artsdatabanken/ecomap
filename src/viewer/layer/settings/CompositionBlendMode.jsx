import React from 'react'
import { SelectField, MenuItem } from 'material-ui'
import getNext from '../../../componentid'

const CompositionBlendMode = ({blendMode, handleBlendModeChange}) =>
  <SelectField
    id={getNext()}
    floatingLabelText='Composition blend mode'
    value={blendMode}
    onChange={handleBlendModeChange}
>
    <MenuItem value='color' primaryText='Color' />
    <MenuItem value='color-burn' primaryText='Color burn' />
    <MenuItem value='color-dodge' primaryText='Color dodge' />
    <MenuItem value='darken' primaryText='Darken' />
    <MenuItem value='difference' primaryText='Difference' />
    <MenuItem value='exclusion' primaryText='Exclusion' />
    <MenuItem value='hard-light' primaryText='Hard light' />
    <MenuItem value='hue' primaryText='Hue' />
    <MenuItem value='lighten' primaryText='Lighten' />
    <MenuItem value='luminosity' primaryText='Luminosity' />
    <MenuItem value='multiply' primaryText='Multiply' />
    <MenuItem value='normal' primaryText='Normal' />
    <MenuItem value='overlay' primaryText='Overlay' />
    <MenuItem value='saturation' primaryText='Saturation' />
    <MenuItem value='screen' primaryText='Screen' />
    <MenuItem value='soft-light' primaryText='Soft light' />
  </SelectField>

export default CompositionBlendMode
