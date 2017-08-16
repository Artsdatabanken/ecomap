import inferno from './hex/inferno.json'
import magma from './hex/magma.json'
import plasma from './hex/plasma.json'
import viridis from './hex/viridis.json'
import {hex2rgbint} from '../colorfunc'

function map (ramp) {
  const len = ramp.length
  const r = new Uint8Array(len * 4)
  for (var i = 0, o = 0; i < ramp.length; i++) {
    const rgba = hex2rgbint(ramp[i])
    r[o++] = rgba.r
    r[o++] = rgba.g
    r[o++] = rgba.b
    r[o++] = 255
  }
  return r
}

const ramp = {}
ramp.inferno = map(inferno)
ramp.magma = map(magma)
ramp.plasma = map(plasma)
ramp.viridis = map(viridis)

export default ramp
