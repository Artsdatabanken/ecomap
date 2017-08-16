import React from 'react'
import { FlatButton, ListItem, Avatar } from 'material-ui'
import {hexToRgbaString} from '../../graphics/color/colorfunc'
import LayerPaintSettings from './settings/LayerPaintSettings'
import PaintSwatch from './PaintSwatch'

export default class ActiveLayerStrip extends React.Component {
  state = {expanded: false, showColorDialog: true}

  render () {
    const paint = this.props.paint
    return (
      <div>
        <ListItem
          disabled={false}
          primaryText={this.props.title}
          secondaryText={this.props.subTitle}
          leftAvatar={<Avatar src={this.props.imageUrl} />}
          rightIconButton={
            <PaintSwatch
              color={hexToRgbaString(paint.fillColor, paint.fillOpacity)}
              onClick={(e) => {
                e.stopPropagation()
                this.setState(prevState => ({showColorDialog: !prevState.showColorDialog}))
              }
              } />
      }
          onClick={() => this.setState(prevState => ({expanded: !prevState.expanded}))}
       />
        {this.state.expanded &&
          <div style={{ marginLeft: '24px', marginRight: '24px' }}>
            <div style={{position: 'relative', float: 'right'}}>
              <FlatButton label='Remove' onTouchTap={() => this.props.onDelete()} />
            </div>
            <LayerPaintSettings
              {...paint}
              onChange={this.props.onChange}
              onDelete={this.props.onDelete}
              showColorDialog={this.state.showColorDialog}
            />
            <div style={{ }}>
              <FlatButton label='Show correlation' onTouchTap={() => this.props.onAddLinkedLayer()} />
            </div>
          </div>
      }
      </div>
    )
  }
}
