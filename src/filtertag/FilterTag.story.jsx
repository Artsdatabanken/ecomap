import PropTypes from 'prop-types'
import React from 'react'
import Chip from 'material-ui/Chip'

export const SpeciesTag = (props) => <FilterTag {...props} backgroundColor='#ff60a0' />
export const YearTag = (props) => <FilterTag {...props} backgroundColor='#ffa060' />
export const EnvironmentalTag = (props) => <FilterTag {...props} backgroundColor='#a060ff' />
export const NatureTag = (props) => <FilterTag {...props} backgroundColor='#a0ff60' />

export const FilterTag = ({ children, onRequestDelete, backgroundColor = '#cccccc' }) => (
  <Chip backgroundColor={backgroundColor} style={{margin: '10px'}} onRequestDelete={onRequestDelete}>{ children }</Chip>
)

FilterTag.propTypes = {
  children: PropTypes.string.isRequired,
  onRequestDelete: PropTypes.func.isRequired
}
