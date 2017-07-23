import React from 'react'
import {AlphaPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker, SketchPicker, SliderPicker, SwatchesPicker, TwitterPicker} from 'react-color'
import {List, ListItem} from 'material-ui'

class ColorPickers extends React.Component {
  render () {
    return (
      <div>
        <List>
          <Picker title='AlphaPicker'><AlphaPicker /></Picker>
          <Picker title='BlockPicker'><BlockPicker /></Picker>
          <Picker title='ChromePicker'><ChromePicker /></Picker>
          <Picker title='CirclePicker'><CirclePicker /></Picker>
          <Picker title='CompactPicker'><CompactPicker /></Picker>
          <Picker title='GithubPicker'><GithubPicker /></Picker>
          <Picker title='HuePicker'><HuePicker /></Picker>
          <Picker title='MaterialPicker'><MaterialPicker /></Picker>
          <Picker title='PhotoshopPicker'><PhotoshopPicker /></Picker>
          <Picker title='SketchPicker'><SketchPicker /></Picker>
          <Picker title='SliderPicker'><SliderPicker /></Picker>
          <Picker title='SwatchesPicker'><SwatchesPicker /></Picker>
          <Picker title='TwitterPicker'><TwitterPicker /></Picker>
        </List>
      </div>)
  }
}

const Picker = ({title, children}) =>
  <ListItem>
    <h3>{title}</h3>
    {children}
  </ListItem>

export default ColorPickers
