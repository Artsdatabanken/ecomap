import PropTypes from 'prop-types'
import React from 'react'

function RedigerKartlag (match) {
  return (
    <div>
      {JSON.stringify(match)}
    </div>
  )
}

RedigerKartlag.propTypes = {
  match: PropTypes.string.isRequired
}

export default RedigerKartlag
