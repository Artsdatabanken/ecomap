import React from 'react'
import { Paper } from 'material-ui'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Liste from './Liste'
import TextField from 'material-ui/TextField'

class AddLayer extends React.Component {
  render () {
    return (
      <Paper>
        <div style={{display: 'flex'}}>
          <Category title='Species' subtitle='Lorem ipsum dolor sit amet consectetur.' imageUrl='https://farm5.staticflickr.com/4107/4839886016_d11b6d2cdf.jpg' />
          <Category title='Naturestuffs' subtitle='Lorem ipsum dolor sit amet consectetur.' imageUrl='http://artsdatabanken.no/Media/F1698?mode=480x480' />
          <Category title='Environmental' subtitle='Lorem ipsum dolor sit amet consectetur.' imageUrl='https://upload.wikimedia.org/wikipedia/commons/6/60/SanBernardinoMountains8000feetsign.JPG' />
        </div>
      </Paper>
    )
  }
}

const Category = ({ title, subtitle, imageUrl }) =>
  <Card style={{width: '400px', margin: '8px', flexDirection: 'column' }}>
    <CardMedia
      overlay={<span >
        <CardTitle titleColor='#eee' title={title} subtitle={subtitle} subtitleColor='#bbb' />
      </span>
      }>
      <img src={imageUrl} />
    </CardMedia>
  </Card>

const Nature = () =>
  <div style={{ padding: 10 }}>
    <TextField
      floatingLabelText='Search...'
      onChange={(e, value) => console.log(value)}
    />
    <Liste />
  </div>

export default AddLayer
