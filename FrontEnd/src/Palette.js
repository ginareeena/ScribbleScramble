import React from "react";
import { lightColors, darkColors, tools } from "./utility/utilityProperties.js";

const PaletteComp = () => {
  // state thing to store the color and update?
  //useRef hook?
  // let paletteColorEl = document.getElementById({ color });

  // let [red, orange, yellow, green, blue, purple, white] = lightColors;
  // let [
  //   dkred,
  //   dkorange,
  //   dkyellow,
  //   dkgreen,
  //   dkblue,
  //   dkpurple,
  //   black,
  // ] = darkColors;

  // const redRef = React.useRef();

  // lightColors.map((color) => {
  //   // let setColor = `set${color}`;
  //   // const [color, setColor] = useState(lightColors[color]);
  //   let [red, orange, yellow, green, blue, purple, black] = useRef(color);
  // });

  // darkColors.map((color) => {
  //   // let setColor = `set${color}`;
  //   // const [color, setColor] = useState(setColor(darkColors[color]));
  //   let [dkred, dkorange, dkyellow, dkgreen, dkblue, dkpurple, black] = useRef(
  //     color
  //   );
  // });

  // let [dkred, dkorange, dkyellow, dkgreen, dkblue, dkpurple, black] = useRef(
  //   color
  // );

  // const [colors, setCanvas] = useState("");
  // is this cray? mayve
  // const red = useRef("red");
  // const orange = useRef("orange");
  // const yellow = useRef("yellow");
  // const green = useRef("green");
  // const blue = useRef("blue");
  // const purple = useRef("purple");
  // const white = useRef("white");
  // const red = useRef("dkred");
  // const orange = useRef("dkorange");
  // const yellow = useRef("dkyellow");
  // const green = useRef("dkgreen");
  // const blue = useRef("dkblue");
  // const purple = useRef("dkpurple");
  // const white = useRef("black");

  return (
    <div id="palette">
      {/* colors */}

      <div>
        {Object.keys(lightColors).map((color) => {
          return (
            <button
              // onChange={updateBrush()}
              ref={`${color}Ref`}
              key={color}
              style={{
                backgroundColor: lightColors[color],
                height: "15px",
                width: "10px",
              }}
            ></button>
          );
        })}
      </div>
      <div>
        {Object.keys(darkColors).map((color) => {
          return (
            <button
              key={color}
              style={{
                backgroundColor: darkColors[color],
                height: "15px",
                width: "10px",
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default PaletteComp;

/* <div className="colorSelector">
        <div className="light">
          {Object.keys(lightColors).map((element) => {
            return (
              <button
                key={element}
                type="button"
                style={{ backgroundColor: lightColors[element] }}
                className={`palette-button${
                  this.state.selected === lightColors[element]
                    ? "-selected"
                    : ""
                }`}
                name="color"
                value={lightColors[element]}
                onClick={this.colorSelect}
              />
            );
          })}
        </div>
        <div className="dark">
          {Object.keys(darkColors).map((element) => {
            return (
              <button
                key={element}
                type="button"
                style={{ backgroundColor: darkColors[element] }}
                className={`palette-button${
                  this.state.selected === darkColors[element] ? "-selected" : ""
                }`}
                name="color"
                value={darkColors[element]}
                onClick={this.colorSelect}
              />
            );
          })}
        </div>
      </div>
    </div> */
