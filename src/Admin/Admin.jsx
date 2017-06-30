import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Paper } from 'material-ui'

import Layers from './Kartlag'

function Admin () {
  return (
    <span>
      <div style={{ position: 'absolute', top: 200, right: 200 }}>
        <Paper>
          {process.env.BRANCH_NAME}
          <a href='http://webtjenester.artsdatabanken.no/NiN/v2b/koder/alleKoder'>NIN koder</a>

          <p><small>You are running this application in <b>
            {process.env.NODE_ENV}</b> mode.</small></p>
        </Paper>
      </div>
      <hr />
      <Router>
        <div>

          {false && <Route path='/admin/layers' component={Layers} />}
        </div>
      </Router>
      <ul>
        <li><Link to='/admin/layers/'>Layers</Link></li>
      </ul>
    </span>
  )
}

export default Admin
