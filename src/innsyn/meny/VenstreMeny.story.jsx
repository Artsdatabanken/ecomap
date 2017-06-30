import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import VenstreMeny from './VenstreMeny'

const layers = {
  'L1-1': { title: 'Grunn limnisk fastbunn', visible: true },
  T4: { title: 'Skogsmark', visible: true },
  T44: { title: 'Åker', visible: true }
}

function VM () {
  return (
    <Router>
      <VenstreMeny layers={layers} open />
    </Router>
  )
}

export default VM
