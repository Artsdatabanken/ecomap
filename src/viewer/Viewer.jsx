import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import MapView from './MapView'
import FetchContainer from '../FetchContainer'

const Upload = () => (
  <div style={{ position: 'absolute', top: '150px', left: '150px', fontSize: '35px' }}>Last opp...</div>
)

const Download = () => (
  <div style={{ position: 'absolute', top: '150px', left: '150px', fontSize: '35px' }}>Last ned...</div>
)

const Innsyn = () => (
  <FetchContainer>
    <MapView />
    <Router>
      <div>
        <Route path='/lastopp' component={Upload} />
        <Route path='/lastned' component={Download} />
      </div>
    </Router>
  </FetchContainer>
)

export default Innsyn
