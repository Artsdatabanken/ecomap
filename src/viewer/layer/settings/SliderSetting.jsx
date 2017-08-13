import React from "react";
import { Slider } from "material-ui";
import Setting from "./Setting";

const SliderSetting = ({ title, icon, value, onChange }) =>
  <Setting title={title}>
    <div style={{ position: "relative", top: "2px", float: "left" }}>
      {icon}
    </div>
    <div
      style={{
        position: "relative",
        float: "left",
        paddingLeft: "16px",
        paddingBottom: "8px",
        width: "310px"
      }}
    >
      <Slider
      sliderStyle={{marginTop: '6px', marginBottom: '0px'}}
      min={0}
        max={1}
        step={0.05}
        value={value}
        onChange={(event, value) => onChange(value)}
      />
    </div>
  </Setting>;
export default SliderSetting;
