import inferno from './hex/inferno.json'
import magma from './hex/magma.json'
import plasma from './hex/plasma.json'
import viridis from './hex/viridis.json'
import {hex2rgbint, rgbToHex} from '../colorfunc'
import customRamps from 'color_ramps'
import Color from 'color'

function map (ramp) {
  const len = ramp.length
  const r = new Uint8Array(len * 3)
  for (var i = 0, o = 0; i < ramp.length; i++) {
    const rgba = hex2rgbint(ramp[i])
    r[o++] = rgba.r
    r[o++] = rgba.g
    r[o++] = rgba.b
  }
  return r
}

function mix (color1, color2, weight) {
  if (color2 === undefined) color2 = color1
  let c1 = new Color(color1)
  let c2 = new Color(color2)
  return c2.mix(c1, weight)
}

export function lookupColor (steps, i) {
  const offset = i / 255 * (steps.length - 1.0)
  const base = Math.trunc(offset)
  let color = mix(steps[base], steps[base + 1], offset - base)
  return color
}

const ramp = {}
ramp.gray = map(['#000000', '#ffffff'])
ramp.inferno = map(inferno)
ramp.magma = map(magma)
ramp.plasma = map(plasma)
ramp.viridis = map(viridis)
ramp.YlGn = map(customRamps.YlGn['9'])
ramp.sliceInFours = function (ramp) {
  var r = []
  const colorCount = ramp.length / 3
  var o = 0
  for (var i = 0; i < colorCount; i++) { r[i] = [ramp[o++], ramp[o++], ramp[o++]] }
  return r
}
ramp.toHex = function (ramp) {
  var r = []
  const colorCount = ramp.length / 3
  var o = 0
  for (var i = 0; i < colorCount; i++) { r[i] = rgbToHex(ramp[o++], ramp[o++], ramp[o++]) }
  return r
}
ramp.ramps = ['inferno', 'magma', 'plasma', 'viridis', 'gray']//, 'YlGn']

export default ramp
