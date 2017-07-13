import React from 'react'
import { Paper } from 'material-ui'
import { Tabs, Tab } from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import Liste from './Liste'
import TextField from 'material-ui/TextField'
import localDrink from 'material-ui/svg-icons/maps/local-drink'
import SelectSpecies from './species/SelectSpecies'

class AddLayer extends React.Component {
  render () {
    return (
      <div style={{}}>
        <Paper
          rounded
          zDepth={4}
          style={{
            position: 'absolute',
            height: 'auto',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
          }}
        >
          <Tabs
            onChange={(a, tab, b) => {
              console.log(b.props)
              this.setState({ activeTab: tab })
            }}
          >
            <Tab
              icon={
                <FontIcon className='muidocs-icon-action-home'>
                  Species
                </FontIcon>
              }
            >
              <SelectSpecies onClick={species => this.props.onClick(species)} />
            </Tab>
            <Tab icon={<localDrink>Environment</localDrink>} />
            <Tab
              icon={
                <FontIcon className='muidocs-icon-action-home'>Nature</FontIcon>
              }
            >
              <Nature />
            </Tab>
          </Tabs>
        </Paper>
      </div>
    )
  }
}

const Nature = () =>
  <div style={{ padding: 10 }}>
    <TextField
      floatingLabelText='Search...'
      onChange={(e, value) => console.log(value)}
    />
    <Liste />
  </div>

export default AddLayer
