import React from "react";
import { lightColors, darkColors } from "./utility/utilityProperties.js";
import { PaletteColorBtn } from "./AppCSS";

const PaletteComp = ({ setColor }) => {
  return (
    <div id="palette">
      <div style={{ display: "flex" }}>
        {Object.values(lightColors).map((color) => {
          return (
            <PaletteColorBtn
              key={color}
              onClick={() => {
                setColor(color);
              }}
              style={{
                backgroundColor: color,
                height: "19px",
                width: "19px",
              }}
            ></PaletteColorBtn>
          );
        })}
      </div>
      <div style={{ display: "flex" }}>
        {Object.values(darkColors).map((color) => {
          return (
            <PaletteColorBtn
              key={color}
              onClick={() => {
                setColor(color);
              }}
              style={{
                backgroundColor: color,
                height: "19px",
                width: "19px",
              }}
            ></PaletteColorBtn>
          );
        })}
      </div>
    </div>
  );
};

export default PaletteComp;
