import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import RedigerKartlag from './RedigerKartlag'
import KartlagListe from './KartlagListe'

class Kartlag extends React.Component {
  addItem = () => {
    const kartlag = this.state.kartlag
    kartlag.push({ id: kartlag.length + 1 })
    this.setState({ kartlag })
  }

  render () {
    return (
      <Router>
        <span>
          <heading>Kartlag</heading>
          <Paper zDepth={4}>
            <Route path='/admin/kartlag/' component={KartlagListe} />
            <Route path='/admin/kartlag/edit/:id' component={RedigerKartlag} />

            <KartlagListe kartlag={this.state.kartlag} />
            <Divider />
            <RaisedButton label='Add' style={{}} onTouchTap={this.addItem()} />
          </Paper>
        </span>
      </Router>
    )
  }
}

// Bitrise  500,- pr måned
// 10 min gratis

export default Kartlag
