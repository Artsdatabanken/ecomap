import React from 'react'
import propTypes from 'prop-types'
import SelectSpecies from './SelectSpecies'
import Paper from 'material-ui/Paper'

const style = {
  padding: 16,
  position: 'absolute',
  left: '1%',
  top: '1%',
  width: '98%',
  height: '98%',
  overflowY: 'auto'
}

const SelectSpeciesDialog = props => {
  console.log(props)
  return (<Paper zDepth={4} style={style}>
    <h2>Species</h2>
    <SelectSpecies onClick={(item) => props.onAddLayer(item)} />
  </Paper>
  )
}

SelectSpeciesDialog.propTypes = {
  onClick: propTypes.func
}

export default SelectSpeciesDialog
