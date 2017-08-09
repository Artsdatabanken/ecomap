import React, { Component } from "react"
import DeckGL from "deck.gl"
import { hexToArray } from "../../viewer/layer/colorfunc"
import HeatmapFromPointsShaderLayer from "./webgl/heatmapFromPoints-layer/heatmapFromPoints-layer"
import viridis from "../../../data/colorramps/viridis.json"

export default class HeatmapFromPointsShader extends Component {
  defaultProps = {
    blendMode: "multiply"
  };

  _initialize(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
    );
  }

  render() {
    const { data, viewport, radius, blendMode } = this.props;
    const fillColor = hexToArray(this.props.fillColor, this.props.fillOpacity);
    if (!data) {
      return null;
    }
    const layer = new HeatmapFromPointsShaderLayer({
      id: "heatmapfrompointsshader",
      data,
      //      radiusScale: radius * 60,
      colorRamp: viridis,
      radiusMinPixels: 1,
      getPosition: d => [d[0], d[1]],
      getColor: d => fillColor,
      getRadius: d => radius * 100000,
      updateTriggers: {
        getColor: { c1: fillColor },
        getRadius: { r1: radius }
      }
    });
    return (
      <DeckGL
        style={{ mixBlendMode: blendMode }}
        {...viewport}
        layers={[layer]}
        onWebGLInitialized={this._initialize}
      />
    );
  }
}
