import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from './theme'

import Viewer from './viewer/Viewer'
import Admin from './Admin/Admin'
import {resetComponentIds} from './componentid'

class App extends React.Component {
  state = { drawerOpen: false, cardOpen: false };

  handleDrawerClose = () => { this.setState({ drawerOpen: false }) }

  render () {
    resetComponentIds()
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Router basename={process.env.REACT_APP_BASENAME}>
          <div>
            <Route path='' component={Viewer} />
            <Route exact path='/admin' component={Admin} />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
