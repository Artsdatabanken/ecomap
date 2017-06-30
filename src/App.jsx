import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from './theme'

import Innsyn from './innsyn/Innsyn'
import Admin from './Admin/Admin'

class App extends React.Component {
  state = { drawerOpen: false, cardOpen: false };

  handleDrawerClose = () => { this.setState({ drawerOpen: false }) }

  render () {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Router basename={process.env.REACT_APP_BASENAME}>
          <div>
            <Route path='' component={Innsyn} />
            <Route exact path='/admin' component={Admin} />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
