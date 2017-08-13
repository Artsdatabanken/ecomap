import React from 'react'
import propTypes from 'prop-types'
import {FlatButton, Paper} from 'material-ui'
import SelectSpecies from './SelectSpecies'

const style = {
  padding: 16,
  position: 'absolute',
  left: '1%',
  top: '1%',
  width: '98%',
  height: '98%'
}

const SelectSpeciesDialog = ({onAddLayer, onClose}) => {
  return (
    <Paper zDepth={4} style={style}>
      <div style={{ }}>
        <h2>Species</h2>
        <div style={{overflowY: 'auto'}}>
          <SelectSpecies onClick={onAddLayer} />
        </div>
        <FlatButton style={{position: 'fixed', bottom: '24px'}} label='Close' onTouchTap={onClose} />
      </div>
    </Paper>
  )
}

SelectSpeciesDialog.propTypes = {
  onAddLayer: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired
}

export default SelectSpeciesDialog
