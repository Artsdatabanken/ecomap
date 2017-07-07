import React from 'react'
import SelectSpecies from './SelectSpecies'
import Paper from 'material-ui/Paper'

const style = {
  padding: 16,
  position: 'absolute',
  left: '1%',
  top: '1%',
  width: '45%',
  height: '98%',
  overflowY: 'auto'
}

const SelectSpeciesDialog = props =>
  <Paper zDepth={4} style={style}>
    <h2>Species</h2>
    <SelectSpecies onClick={(item) => props.onClick(item)} />
  </Paper>

export default SelectSpeciesDialog
