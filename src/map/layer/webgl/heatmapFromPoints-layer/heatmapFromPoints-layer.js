import { fp64ify } from "deck.gl/dist/lib/utils";
import { Layer, COORDINATE_SYSTEM } from "deck.gl";
// import {enable64bitSupport} from 'deck.gl/lib/utils/fp64.js'
import { GL, Framebuffer, Texture2D, Model, Geometry } from "luma.gl";

import vs from "./heatmapFromPoints-layer-vertex.glsl";
// import vs64 from './experimentalshader-layer-vertex-64.glsl'
import fs from "./heatmapFromPoints-layer-fragment.glsl";
import fsScreen from "./grayscaleToColor-fragment.glsl";
import vsScreen from "./screenQuad-vertex.glsl";

const DEFAULT_COLOR = [0, 0, 0, 255];

const defaultProps = {
  radiusScale: 1,
  fillOpacity: 1.0,
  height: 1.0,
  fp64: false,
  getPosition: x => x.position,
  getRadius: x => x.radius || 1,
  getColor: x => x.color || DEFAULT_COLOR
};

export default class HeatmapFromPointsShader extends Layer {
  getShaders(id) {
    const { shaderCache } = this.context;
    return { vs, fs, modules: ["project"], shaderCache };
  }

  getShaders2(id) {
    const { shaderCache } = this.context;
    return { vs: vsScreen, fs: fsScreen, modules: ["project"], shaderCache };
  }

  initializeState() {
    const { gl } = this.context;
    console.log(gl);
    const heatTexture = new Texture2D(gl, {
      width: gl.canvas.width,
      height: gl.canvas.height,
      format: GL.RGBA,
      parameters: {
        [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
        [GL.TEXTURE_MIN_FILTER]: GL.NEAREST
      },
      pixelStore: {
        [GL.UNPACK_FLIP_Y_WEBGL]: true
      },
      mipmaps: false
    });
    const width = 900;//gl.canvas.width;
    const height = 800;//gl.canvas.height;
    console.log(width,height)
    var fbHeat = new Framebuffer(gl, { width, height });
    //  fbHeat.initialize({ bytes: gl.canvas.width * gl.canvas.height * 4 });
    //  fbHeat.clear();
    //   fbHeat.attach([heatTexture]);
    //   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, heatTexture);
    //    console.warn(fbHeat.checkStatus())
    //    heatTexture.bind(0, fbHeat);
    //    heatTexture.bind(0);

    /* eslint-disable max-len */
    /* deprecated props check */
    this._checkRemovedProp("radius", "radiusScale");

    this.state.attributeManager.addInstanced({
      instancePositions: {
        size: 3,
        accessor: "getPosition",
        update: this.calculateInstancePositions
      },
      instanceRadius: {
        size: 1,
        accessor: "getRadius",
        defaultValue: 1,
        update: this.calculateInstanceRadius
      }
    });
    /* eslint-enable max-len */

    const rampTexture = new Texture2D(gl, {
      width: 256,
      height: 1,
      format: GL.RGBA,
      data: new Uint8Array(this.props.colorRamp),
      parameters: {
        [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
        [GL.TEXTURE_MIN_FILTER]: GL.NEAREST
      },
      pixelStore: {
        [GL.UNPACK_FLIP_Y_WEBGL]: true
      },
      mipmaps: true
    });
    //   rampTexture.bind(0);
    this.setState({
      model: this._getModel(gl),
      model2: this._getModel2(gl),
      fbHeat,
      rampTexture
    });
  }

  updateAttribute({ props, oldProps, changeFlags }) {
    if (props.fp64 !== oldProps.fp64) {
      const { attributeManager } = this.state;
      attributeManager.invalidateAll();

      if (props.fp64 && props.projectionMode === COORDINATE_SYSTEM.LNGLAT) {
        attributeManager.addInstanced({
          instancePositions64xyLow: {
            size: 2,
            accessor: "getPosition",
            update: this.calculateInstancePositions64xyLow
          }
        });
      } else {
        attributeManager.remove(["instancePositions64xyLow"]);
      }
    }
  }

  updateState({ props, oldProps, changeFlags }) {
    super.updateState({ props, oldProps, changeFlags });
    if (props.fp64 !== oldProps.fp64) {
      const { gl } = this.context;
      this.setState({
        model: this._getModel(gl),
        model2: this._getModel2(gl)
      });
    }
    this.updateAttribute({ props, oldProps, changeFlags });
  }

  draw({ uniforms }) {
    const gl = this.state.model.gl;
    var fbHeat = this.state.fbHeat;

    const { radiusScale, fillOpacity } = this.props;
    const args = Object.assign({}, uniforms, {
      radiusScale,
      fillOpacity,
      height: this.props.height
    });
    //   window.luma.log.priority = 4;

    this.state.model.draw({
      framebuffer: fbHeat,
      uniforms: args
    });
/*    const data = fbHeat.texture.getSubData({offset: 0, size: 800*800*4});
    let count = 0
    for (var c in data)
      if(c!=0)
        count++
    console.log('pixels', count)
*/
    window.luma.log.priority = 4
    this.state.model2.draw({
      framebuffer: null,
      uniforms: {
        colorRamp: this.state.rampTexture,
        heatTexture: this.state.fbHeat.texture,
        fillOpacity: 0.5,
        uRes: [gl.canvas.width, gl.canvas.height]
      }
    });
    window.luma.log.priority = 1
  }

  _getModel(gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0];

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
    );
  }

  _getModel2(gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0];

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
    );
  }

  calculateInstancePositions(attribute) {
    const { data, getPosition } = this.props;
    const { value } = attribute;
    let i = 0;
    for (const point of data) {
      const position = getPosition(point);
      value[i++] = position[0];
      value[i++] = position[1];
      value[i++] = position[2] || 0;
    }
  }

  calculateInstancePositions64xyLow(attribute) {
    const { data, getPosition } = this.props;
    const { value } = attribute;
    let i = 0;
    for (const point of data) {
      const position = getPosition(point);
      value[i++] = fp64ify(position[0])[1];
      value[i++] = fp64ify(position[1])[1];
    }
  }

  calculateInstanceRadius(attribute) {
    const { data, getRadius } = this.props;
    const { value } = attribute;
    let i = 0;
    for (const point of data) {
      const radius = getRadius(point);
      value[i++] = isNaN(radius) ? 1 : radius;
    }
  }
}

HeatmapFromPointsShader.layerName = "HeatmapFromPointsShader";
HeatmapFromPointsShader.defaultProps = defaultProps;
