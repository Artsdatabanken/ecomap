import React from "react";
import ActionAllOut from "material-ui/svg-icons/action/all-out";
import ActionOpacity from "material-ui/svg-icons/action/opacity";
import SliderSetting from "./SliderSetting";
import getNext from '../../componentid'

export default class HeatmapLayerSettings extends React.Component {
  render() {
    const { radius, height, fillOpacity, onChange } = this.props;
    return (
      <div>
        <SliderSetting
          id={getNext()}
          title="Width"
          value={radius}
          icon={<ActionAllOut />}
          onChange={value => onChange("radius", value)}
        />
        <SliderSetting
          id={getNext()}
          title="Peak height"
          value={height}
          icon={<ActionAllOut />}
          onChange={value => onChange("height", value)}
        />
        <SliderSetting
          id={getNext()}
          title="Opacity"
          value={fillOpacity}
          icon={<ActionOpacity />}
          onChange={value => onChange("fillOpacity", value)}
        />
      </div>
    );
  }
}
