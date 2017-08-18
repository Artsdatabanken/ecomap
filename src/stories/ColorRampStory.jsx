import React from 'react'
import ColorRamp from '../graphics/color/ColorRamp'
import ramps from '../graphics/color/ramps/'

const ColorRampStory = () =>
  <div style={{ margin: '20px' }}>
    <LabelledColorRamp label='Grays' steps={['#000000', '#ffffff']} />
    <LabelledColorRamp label='RGB' steps={['#ff0000', '#00ff00', '#0000ff']} />
    <LabelledColorRamp label='Spectral' steps={['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2']} />
    <LabelledColorRamp label='Viridis' steps={ramps.toHex(ramps.viridis)} />
    <LabelledColorRamp label='Plasma' steps={ramps.toHex(ramps.plasma)} />
  </div>

const LabelledColorRamp = ({label, steps}) =>
  <div>
    <div>{label}</div>
    <ColorRamp steps={steps} />
  </div>

export default ColorRampStory
