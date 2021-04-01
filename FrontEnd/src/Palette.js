import React, { useState, useEffect } from "react";
import { lightColors, darkColors, tools } from "./utility/utilityProperties.js";

const PaletteComp = ({ currColor, setColor }) => {
  return (
    <div id="palette">
      <div>
        {Object.values(lightColors).map((color) => {
          return (
            <button
              key={color}
              onClick={() => {
                setColor(color);
              }}
              style={{
                backgroundColor: color,
                height: "19px",
                width: "19px",
              }}
            ></button>
          );
        })}
      </div>
      <div>
        {Object.values(darkColors).map((color) => {
          return (
            <button
              key={color}
              onClick={() => {
                setColor(color);
              }}
              style={{
                backgroundColor: color,
                height: "19px",
                width: "19px",
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default PaletteComp;
