import { Layer, COORDINATE_SYSTEM } from 'deck.gl'
import { GL, Framebuffer, Texture2D, Model, Geometry } from 'luma.gl'

import vs from './temporalHeatmap-layer-vertex.glsl'
import fs from './temporalHeatmap-layer-fragment.glsl'
import fsScreen from './grayscaleToColor-fragment.glsl'
import vsScreen from './screenQuad-vertex.glsl'

const DEFAULT_COLOR = [0, 0, 0, 255]

const defaultProps = {
  radiusScale: 1,
  fillOpacity: 1.0,
  height: 1.0,
  fp64: false,
  getPosition: x => x.position,
  getRadius: x => x.radius || 1,
  getColor: x => x.color || DEFAULT_COLOR,
  _dataComparator: (a, b) => a.length === b.length
}

export default class TemporalHeatmapLayer extends Layer {
  constructor (options) {
    const opts = {
      data: options.data,
      colorRamp: options.colorRamp,
      height: Math.sqrt(options.height + 1, 2) - 1,
      radiusScale: options.radiusScale * 2,
      getPosition: d => [d[0], d[1]],
      getRadius: d => options.radius * 100000,
      fillOpacity: options.fillOpacity
    }
    super(opts)
    console.log(opts)
    window.luma.log.priority = 1
    window.deck.log.priority = 3
  }

  getShaders (id) {
    const { shaderCache } = this.context
    return { vs, fs, modules: ['project'], shaderCache }
  }

  getShaders2 (id) {
    const { shaderCache } = this.context
    return { vs: vsScreen, fs: fsScreen, modules: ['project'], shaderCache }
  }

  initializeState () {
    const { gl } = this.context
    var fbHeat = new Framebuffer(gl, {depth: false})

    /* eslint-disable max-len */
    /* deprecated props check */
    this._checkRemovedProp('radius', 'radiusScale')

    this.state.attributeManager.addInstanced({
      instancePositions: {
        size: 3,
        accessor: 'getPosition',
        update: this.calculateInstancePositions
      },
      instanceRadius: {
        size: 1,
        accessor: 'getRadius',
        defaultValue: 1,
        update: this.calculateInstanceRadius
      }
    })
    /* eslint-enable max-len */

    const rampTexture = new Texture2D(gl, {
      width: this.props.colorRamp.length / 3,
      height: 1,
      format: GL.RGB,
      pixels: this.props.colorRamp,
      parameters: {
        [GL.TEXTURE_MAG_FILTER]: GL.LINEAR,
        [GL.TEXTURE_MIN_FILTER]: GL.LINEAR,
        [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE
      },
      mipmaps: false
    })

    this.setState({
      model: this._getModel(gl),
      model2: this._getModel2(gl),
      fbHeat,
      rampTexture
    })
  }

  updateAttribute ({ props, oldProps, changeFlags }) {
    if (props.fp64 !== oldProps.fp64) {
      const { attributeManager } = this.state
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
        attributeManager.remove(['instancePositions64xyLow'])
      }
    }
  }

  updateState ({ props, oldProps, changeFlags }) {
    super.updateState({ props, oldProps, changeFlags })
    if (props.fp64 !== oldProps.fp64) {
      const { gl } = this.context
      this.setState({
        model: this._getModel(gl),
        model2: this._getModel2(gl)
      })
    }
    if (props.colorRamp !== oldProps.colorRamp) {
      const gl = this.context.gl
      this.state.rampTexture.bind(0)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, props.colorRamp.length / 3,
        1, 0, gl.RGB,
        gl.UNSIGNED_BYTE, props.colorRamp)
    }
    this.updateAttribute({ props, oldProps, changeFlags })
  }

  draw ({ uniforms }) {
    const { gl } = this.context
    var fbHeat = this.state.fbHeat

    const {width, height} = gl.canvas
    fbHeat.resize({width, height})
    fbHeat.bind(gl.FRAMEBUFFER)
    gl.clear(gl.COLOR_BUFFER_BIT)
    const { radiusScale, fillOpacity } = this.props
    const args = Object.assign({}, uniforms, {
      radiusScale,
      fillOpacity,
      height: this.props.height
    })

    gl.blendFunc(gl.ONE, gl.ONE)
    this.state.model.draw({
      framebuffer: fbHeat,
      uniforms: args
    })

    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
)

    this.state.model2.draw({
      framebuffer: null,
      uniforms: {
        colorRamp: this.state.rampTexture,
        heatTexture: fbHeat.texture,
        fillOpacity: this.props.fillOpacity,
        uRes: [gl.canvas.width, gl.canvas.height]
      }
    })
  }

  _getModel (gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0]

    return new Model(
      gl,
      Object.assign(this.getShaders(), {
        id: this.props.id,
        geometry: new Geometry({
          drawMode: GL.TRIANGLE_FAN,
          positions: new Float32Array(positions)
        }),
        isInstanced: true,
        shaderCache: this.context.shaderCache
      })
    )
  }

  _getModel2 (gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0]

    return new Model(
      gl,
      Object.assign(this.getShaders2(), {
        id: this.props.id,
        geometry: new Geometry({
          drawMode: GL.TRIANGLE_FAN,
          positions: new Float32Array(positions)
        }),
        isInstanced: false,
        shaderCache: this.context.shaderCache
      })
    )
  }

  calculateInstancePositions (attribute) {
    const { data, getPosition } = this.props
    const { value } = attribute
    let i = 0
    console.log('attribute', attribute)
    for (const point of data) {
      const position = getPosition(point)
      value[i++] = position[0]
      value[i++] = position[1]
      value[i++] = position[2] || 0
    }
  }

  calculateInstanceRadius (attribute) {
    const { data, getRadius } = this.props
    const { value } = attribute
    let i = 0
    for (const point of data) {
      const radius = getRadius(point)
      value[i++] = isNaN(radius) ? 1 : radius
    }
  }
}

TemporalHeatmapLayer.layerName = 'TemporalHeatmapLayer'
TemporalHeatmapLayer.defaultProps = defaultProps
