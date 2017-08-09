import {Layer, COORDINATE_SYSTEM, fp64ify} from 'deck.gl'
// import {enable64bitSupport} from 'deck.gl/lib/utils/fp64.js'
import {GL, Model, Geometry} from 'luma.gl'

import vs from './heatmapFromPoints-layer-vertex.glsl'
// import vs64 from './experimentalshader-layer-vertex-64.glsl'
import fs from './heatmapFromPoints-layer-fragment.glsl'

const DEFAULT_COLOR = [0, 0, 0, 255]

const defaultProps = {
  radiusScale: 1,
  radiusMinPixels: 0, //  min point radius in pixels
  radiusMaxPixels: Number.MAX_SAFE_INTEGER, // max point radius in pixels
  strokeWidth: 1,
  outline: false,
  fp64: false,

  getPosition: x => x.position,
  getRadius: x => x.radius || 1,
  getColor: x => x.color || DEFAULT_COLOR
}

export default class HeatmapFromPointsShader extends Layer {
  getShaders (id) {
    const {shaderCache} = this.context
    return {vs: vs, fs, modules: ['project'], shaderCache}
    /* enable64bitSupport(this.props)
      ? {vs: vs64, fs, modules: ['project64'], shaderCache}
      : {vs, fs, shaderCache} // 'project' module added by default. */
  }

  initializeState () {
    const {gl} = this.context
    this.setState({model: this._getModel(gl)})

    /* eslint-disable max-len */
    /* deprecated props check */
    this._checkRemovedProp('radius', 'radiusScale')
    this._checkRemovedProp('drawOutline', 'outline')

    this.state.attributeManager.addInstanced({
      instancePositions: {size: 3, accessor: 'getPosition', update: this.calculateInstancePositions},
      instanceRadius: {size: 1, accessor: 'getRadius', defaultValue: 1, update: this.calculateInstanceRadius},
      instanceColors: {size: 4, type: GL.UNSIGNED_BYTE, accessor: 'getColor', update: this.calculateInstanceColors}
    })
    /* eslint-enable max-len */
  }

  updateAttribute ({props, oldProps, changeFlags}) {
    if (props.fp64 !== oldProps.fp64) {
      const {attributeManager} = this.state
      attributeManager.invalidateAll()

      if (props.fp64 && props.projectionMode === COORDINATE_SYSTEM.LNGLAT) {
        attributeManager.addInstanced({
          instancePositions64xyLow: {
            size: 2,
            accessor: 'getPosition',
            update: this.calculateInstancePositions64xyLow
          }
        })
      } else {
        attributeManager.remove([
          'instancePositions64xyLow'
        ])
      }
    }
  }

  updateState ({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags})
    if (props.fp64 !== oldProps.fp64) {
      const {gl} = this.context
      this.setState({model: this._getModel(gl)})
    }
    this.updateAttribute({props, oldProps, changeFlags})
  }

  draw ({uniforms}) {
    console.log(uniforms)
    const {radiusScale, radiusMinPixels, radiusMaxPixels, outline, strokeWidth} = this.props
    const args = Object.assign({}, uniforms, {
      outline: outline ? 1 : 0,
      strokeWidth,
      radiusScale,
      radiusMinPixels,
      radiusMaxPixels
    })
    this.state.model.render(args)
  }

  _getModel (gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0]

    return new Model(gl, Object.assign(this.getShaders(), {
      id: this.props.id,
      geometry: new Geometry({
        drawMode: GL.TRIANGLE_FAN,
        positions: new Float32Array(positions)
      }),
      isInstanced: true,
      shaderCache: this.context.shaderCache
    }))
  }

  calculateInstancePositions (attribute) {
    const {data, getPosition} = this.props
    const {value} = attribute
    let i = 0
    for (const point of data) {
      const position = getPosition(point)
      value[i++] = position[0]
      value[i++] = position[1]
      value[i++] = position[2] || 0
    }
  }

  calculateInstancePositions64xyLow (attribute) {
    const {data, getPosition} = this.props
    const {value} = attribute
    let i = 0
    for (const point of data) {
      const position = getPosition(point)
      value[i++] = fp64ify(position[0])[1]
      value[i++] = fp64ify(position[1])[1]
    }
  }

  calculateInstanceRadius (attribute) {
    const {data, getRadius} = this.props
    const {value} = attribute
    let i = 0
    for (const point of data) {
      const radius = getRadius(point)
      value[i++] = isNaN(radius) ? 1 : radius
    }
  }

  calculateInstanceColors (attribute) {
    const {data, getColor} = this.props
    const {value} = attribute
    let i = 0
    for (const point of data) {
      const color = getColor(point) || DEFAULT_COLOR
      value[i++] = color[0]
      value[i++] = color[1]
      value[i++] = color[2]
      value[i++] = color[3]
    }
  }
}

HeatmapFromPointsShader.layerName = 'HeatmapFromPointsShader'
HeatmapFromPointsShader.defaultProps = defaultProps
