import PropTypes from 'prop-types'
import React from 'react'
import { ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'

function Kartlagelement ({ kartlag }) {
  return (
    <ListItem>
      <Link to={`/admin/kartlag/edit/${kartlag.id}`}>{kartlag.id}</Link>
    </ListItem>
  )
}

Kartlagelement.propTypes = {
  kartlag: PropTypes.object.isRequired
}

export default Kartlagelement
