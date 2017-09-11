import { Layer } from 'deck.gl'
import { GL, Framebuffer, Texture2D, Model, Geometry } from 'luma.gl'

import vs from './temporalHeatmap-animation-vertex.glsl'
import fs from './temporalHeatmap-animation-fragment.glsl'
import fsBlurHorizontal from './horizontalGaussian-fragment.glsl'
import fsBlurVertical from './verticalGaussian-fragment.glsl'
import fsScreen from './grayscaleToColor-fragment.glsl'
import vsScreen from './screenQuad-vertex.glsl'

const DEFAULT_COLOR = [0, 0, 0, 255]

const defaultProps = {
  time: 0,
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
      temporalData: options.temporalData,
      colorRamp: options.colorRamp,
      height: Math.sqrt(options.height + 1, 2) - 1,
      radiusScale: options.radiusScale * 2,
      getPosition: d => [d[0], d[1]],
      getRadius: d => options.radius * 100000,
      fillOpacity: options.fillOpacity,
      time: options.time
    }
    super(opts)
    window.luma.log.priority = 1
    window.deck.log.priority = 3
  }

  getShaders (id) {
    const { shaderCache } = this.context
    return { vs, fs, modules: ['project'], shaderCache }
  }

  getShadersBlurVertical (id) {
    const { shaderCache } = this.context
    return { vs: vsScreen, fs: fsBlurVertical, modules: [], shaderCache }
  }

  getShadersBlurHorizontal (id) {
    const { shaderCache } = this.context
    return { vs: vsScreen, fs: fsBlurHorizontal, modules: [], shaderCache }
  }

  getShadersColorRamp (id) {
    const { shaderCache } = this.context
    return { vs: vsScreen, fs: fsScreen, modules: [], shaderCache }
  }

  initializeState () {
    const { gl } = this.context
    var fbHeat = new Framebuffer(gl, {depth: false})
    var fbBlur1 = new Framebuffer(gl, {depth: false})

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

    var temporalTexture = new Texture2D(gl, {
      format: GL.RGB,
      pixels: this.props.temporalData,
      parameters: {
        [GL.TEXTURE_MAG_FILTER]: GL.LINEAR,
        [GL.TEXTURE_MIN_FILTER]: GL.LINEAR,
        [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE
      },
      mipmaps: false
    })

    var rampTexture = new Texture2D(gl, {
      format: GL.RGB,
      pixels: this.props.colorRamp,
      parameters: {
        [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
        [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
        [GL.TEXTURE_WRAP_S]: GL.CLAMP_TO_EDGE
      },
      mipmaps: false
    })

    this.setState({
      model: this._getModel(gl),
      modelBlurVertical: this._getModelBlurVertical(gl),
      modelBlurHorizontal: this._getModelBlurHorizontal(gl),
      modelColorRamp: this._getModelColorRamp(gl),
      fbHeat,
      fbBlur1,
      rampTexture,
      temporalTexture
    })
  }

  updateAttribute ({ props, oldProps, changeFlags }) {
  }

  updateState ({ props, oldProps, changeFlags }) {
    super.updateState({ props, oldProps, changeFlags })
    if (props.fp64 !== oldProps.fp64) {
      const { gl } = this.context
      this.setState({
        model: this._getModel(gl),
        modelColorRamp: this._getModelColorRamp(gl)
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
    var fbBlur1 = this.state.fbBlur1
    const {width, height} = gl.canvas
    fbHeat.resize({width, height})
    fbHeat.bind(gl.FRAMEBUFFER)
    gl.clear(gl.COLOR_BUFFER_BIT)
    const { time, radiusScale, fillOpacity } = this.props

    gl.blendFunc(gl.ONE, gl.ONE)

    this.state.model.draw({
      framebuffer: fbHeat,
      uniforms: {
        time,
        radiusScale,
        fillOpacity,
        height: this.props.height,
        temporalTexture: this.state.temporalTexture
      }
    })

    fbBlur1.resize({width, height})
    fbBlur1.bind(gl.FRAMEBUFFER)
    gl.clear(gl.COLOR_BUFFER_BIT)

    this.state.modelBlurHorizontal.draw({
      framebuffer: fbBlur1,
      uniforms: {
        sourceTexture: fbHeat.texture,
        iResolution: [gl.canvas.width, gl.canvas.height]
      }
    })

    fbHeat.bind(gl.FRAMEBUFFER)
    gl.clear(gl.COLOR_BUFFER_BIT)

    this.state.modelBlurVertical.draw({
      framebuffer: fbHeat,
      uniforms: {
        sourceTexture: fbBlur1.texture,
        iResolution: [gl.canvas.width, gl.canvas.height]
      }
    })

    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA)

    this.state.modelColorRamp.draw({
      framebuffer: null,
      uniforms: {
        colorRamp: this.state.rampTexture,
        sourceTexture: fbHeat.texture,
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

  _getModelBlurHorizontal (gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0]

    return new Model(
          gl,
          Object.assign(this.getShadersBlurHorizontal(), {
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

  _getModelBlurVertical (gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0]

    return new Model(
          gl,
          Object.assign(this.getShadersBlurVertical(), {
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

  _getModelColorRamp (gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0]

    return new Model(
      gl,
      Object.assign(this.getShadersColorRamp(), {
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
