import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { muiTheme } from "storybook-addon-material-ui";
import ActiveLayers from "../viewer/layer/ActiveLayers";
import HexagonLayerSettings from "../viewer/layer/settings/layer/HexagonLayerSettings";
import ScatterplotLayerSettings from "../viewer/layer/settings/layer/ScatterplotLayerSettings";
import HeatmapLayerSettings from "../viewer/layer/settings/layer/HeatmapLayerSettings";

class ActiveLayersTest extends React.Component {
  state = {
    layers: {
      "31241": {
        id: 31241,
        title: "Alces alces",
        subTitle: "elg",
        imageUrl:
          "https://farm5.staticflickr.com/4107/4839886016_d11b6d2cdf.jpg",
        dataUrl:
          "http://webtjenester.artsdatabanken.no/Artskart/api/listhelper/31241/observations?&fromYear=1981&toYear=2012&fromMonth=1&toMonth=12&type=all&region=all&scientificNameId=48103",
        source: "geojson",
        visible: true,
        raster: false,
        paint: {
          fillColor: "#ff0000",
          fillOpacity: 1,
          renderMethod: "heatmap",
          blendMode: "multiply"
        }
      }
    }
  };

  handleUpdateLayerProp = (o, key, value) => {
    const layers = this.state.layers;
    layers[o.id].paint[key] = value;
    this.setState({ layers });
  };

  handleDeleteLayer = (layer) => {
    const layers = this.state.layers;
    delete layers[layer.id]
    this.setState({ layers });
  };

  render() {
    return (
      <ActiveLayers
        layers={this.state.layers}
        onUpdateLayerProp={this.handleUpdateLayerProp}
        onDeleteLayer={(layer)=>this.handleDeleteLayer(layer)}
      />
    );
  }
}

const layerSettings = () =>
  storiesOf("Layer settings", module)
    .addDecorator(muiTheme())
    .add("primary", () =>
      <div style={{ margin: "20px" }}>
        <ActiveLayersTest />
      </div>
    )
    .add("Heatmap", () => {
      let paint = {
        fillColor: "#ff0000",
        coverage: 0.95,
        fillOpacity: 1.0,
        radius: 1.0,
        renderMethod: "hexagon",
        blendMode: "multiply"
      };
      return (
        <div style={{ width: "400px", padding: "20px" }}>
          <HeatmapLayerSettings
            {...paint}
            onChange={action("onUpdateLayerProp")}
          />
        </div>
      );
    })
    .add("Scatterplot", () => {
      let paint = {
        fillColor: "#ff0000",
        coverage: 0.95,
        fillOpacity: 1.0,
        radius: 1.0,
        renderMethod: "hexagon",
        blendMode: "multiply"
      };
      return (
        <div style={{ width: "400px", padding: "20px" }}>
          <ScatterplotLayerSettings
            {...paint}
            onChange={action("onUpdateLayerProp")}
          />
        </div>
      );
    })
    .add("Hexagon", () => {
      let paint = {
        fillColor: "#ff0000",
        coverage: 0.95,
        fillOpacity: 1.0,
        radius: 1.0,
        renderMethod: "hexagon",
        blendMode: "multiply"
      };
      return (
        <div style={{ width: "400px", padding: "20px" }}>
          <HexagonLayerSettings
            {...paint}
            onChange={action("onUpdateLayerProp")}
          />
        </div>
      );
    });

export default layerSettings;
