import React from 'react'
import { SelectField, MenuItem } from 'material-ui'
import getNext from '../../../../componentid'

const VisualizationSelector = ({mode, onChange}) =>
  <SelectField
    id={getNext()}
    floatingLabelText='Visualization'
    value={mode}
    onChange={onChange}
  >
    <MenuItem value='heatmap' primaryText='Heatmap' />
    <MenuItem value='hexagon' primaryText='Hexagonal binning' />
    <MenuItem value='scatterplot' primaryText='Scatterplot' />
  </SelectField>

export default VisualizationSelector
