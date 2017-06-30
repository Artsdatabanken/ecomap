import React from 'react'
import { Paper } from 'material-ui'
import { Tabs, Tab } from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
// import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff'
import Liste from './Liste'
import TextField from 'material-ui/TextField'
// import Divider from 'material-ui/Divider'
import localDrink from 'material-ui/svg-icons/maps/local-drink'

class AddLayer extends React.Component {
  render () {
    return (
      <div style={{ width: '80%', padding: 20 }}>
        <Paper rounded zDepth={4}>
          <Tabs
            onChange={(a, tab, b) => {
              console.log(b.props)
              this.setState({ activeTab: tab })
            }}
          >
            <Tab
              icon={
                <FontIcon className='muidocs-icon-action-home'>
                  Naturtyper
                </FontIcon>
              }
            >
              <Naturtyper />
            </Tab>
            <Tab
              icon={
                <FontIcon className='muidocs-icon-action-home'>Arter</FontIcon>
              }
            />
            <Tab
              icon={
                <localDrink>
                  Miljøvariabler
                </localDrink>
              }
            />
          </Tabs>
        </Paper>
      </div>
    )
  }
}

const Naturtyper = () =>
  <div style={{padding: 10}}>
    <TextField floatingLabelText='Søk...' onChange={(e, value) => console.log(value)} />
    <Liste />
  </div>

export default AddLayer
