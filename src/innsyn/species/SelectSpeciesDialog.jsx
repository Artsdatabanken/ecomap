import React from 'react'
import SelectSpecies from './SelectSpecies'
import Paper from 'material-ui/Paper'

const style2 = {
  padding: 16,
  position: 'absolute',
  left: '1%',
  top: '1%',
  width: '45%',
  height: '98%',
  overflowY: 'auto'
}

const SelectSpeciesDialog = props =>
  <Paper zDepth={4} style={style2}>
    <h2>Legg til kartlag</h2>
    <SelectSpecies />
  </Paper>

export default SelectSpeciesDialog
