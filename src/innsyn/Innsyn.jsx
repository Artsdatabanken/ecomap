import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Hovedside from './Hovedside'
import FetchContainer from '../FetchContainer'

const LastOpp = () => (
  <div style={{ position: 'absolute', top: '150px', left: '150px', fontSize: '35px' }}>Last opp...</div>
)

const LastNed = () => (
  <div style={{ position: 'absolute', top: '150px', left: '150px', fontSize: '35px' }}>Last ned...</div>
)

const Innsyn = () => (
  <FetchContainer>
    <Hovedside />
    <Router>
      <div>
        <Route path='/lastopp' component={LastOpp} />
        <Route path='/lastned' component={LastNed} />
      </div>
    </Router>
  </FetchContainer>
)

export default Innsyn
