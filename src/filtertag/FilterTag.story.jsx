import PropTypes from 'prop-types'
import React from 'react'
import Chip from 'material-ui/Chip'

const FilterTag = ({ children, onRequestDelete }) => (
  <Chip onRequestDelete={onRequestDelete}>{ children }</Chip>
)

FilterTag.propTypes = {
  children: PropTypes.string.isRequired,
  onRequestDelete: PropTypes.func.isRequired
}

export default FilterTag
