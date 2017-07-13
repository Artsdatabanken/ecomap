import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import LeftMenu from './LeftMenu'

const layers = {
  'L1-1': { title: 'Grunn limnisk fastbunn', visible: true },
  T4: { title: 'Skogsmark', visible: true },
  T44: { title: 'Åker', visible: true }
}

function VM () {
  return (
    <Router>
      <LeftMenu layers={layers} open />
    </Router>
  )
}

export default VM
