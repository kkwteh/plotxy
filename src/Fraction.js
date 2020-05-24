import { Surface, Rectangle, Layer } from "recharts";

import _ from "lodash";
import React, { useState } from "react";

const gcd_two_numbers = (x, y) => {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
};

const lcm = (x, y) => {
  if (typeof x !== "number" || typeof y !== "number") return false;
  return !x || !y ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
};

export default function Fraction(props) {
  const [numerator1, setNumerator1] = useState(null);
  const [denominator1, setDenominator1] = useState(null);
  const [numerator2, setNumerator2] = useState(null);
  const [denominator2, setDenominator2] = useState(null);

  const handleChange = setParamFunc => event => {
    setParamFunc(parseInt(event.target.value));
  };

  return (
    <>
      <div>
        <input
          placeholder="numerator"
          type="text"
          onChange={handleChange(setNumerator1)}
        />
        <input
          placeholder="denominator"
          type="text"
          onChange={handleChange(setDenominator1)}
        />
        <input
          placeholder="numerator"
          type="text"
          onChange={handleChange(setNumerator2)}
        />
        <input
          placeholder="denominator"
          type="text"
          onChange={handleChange(setDenominator2)}
        />
      </div>
      <Drawing
        numerator1={numerator1}
        denominator1={denominator1}
        numerator2={numerator2}
        denominator2={denominator2}
      ></Drawing>
    </>
  );
}

function Drawing(props) {
  const x = 20;
  const y1 = 50;
  const y2 = 150;
  const width = 400;
  const height = 75;
  let text1 = null;
  if (!_.isNil(props.numerator1) && !_.isNil(props.denominator1)) {
    text1 = `${props.numerator1} / ${props.denominator1}`;
  }

  if (
    !_.isNil(props.numerator1) &&
    !_.isNil(props.denominator1) &&
    !_.isNil(props.numerator2) &&
    !_.isNil(props.denominator2)
  ) {
    text1 = `${props.numerator1} / ${props.denominator1} = ${(props.numerator1 *
      lcm(props.denominator1, props.denominator2)) /
      props.denominator1} / ${lcm(props.denominator1, props.denominator2)}`;
  }

  let text2 = null;
  if (!_.isNil(props.numerator2) && !_.isNil(props.denominator2)) {
    text2 = `${props.numerator2} / ${props.denominator2}`;
  }

  if (
    !_.isNil(props.numerator1) &&
    !_.isNil(props.denominator1) &&
    !_.isNil(props.numerator2) &&
    !_.isNil(props.denominator2)
  ) {
    text2 = `${props.numerator2} / ${props.denominator2} = ${(props.numerator2 *
      lcm(props.denominator1, props.denominator2)) /
      props.denominator2} / ${lcm(props.denominator1, props.denominator2)}`;
  }

  const drawing = (
    x,
    y,
    width,
    height,
    numerator,
    denominator,
    otherDenominator
  ) => {
    const rectangles = [];
    if (_.isNaN(denominator)) {
      return;
    }

    for (const i of Array(denominator + 1)
      .fill(0)
      .map((v, i) => i)) {
      rectangles.push(
        <Rectangle
          key={`rectangle-${i}`}
          x={x + Math.round((i / denominator) * width)}
          y={y}
          width={1}
          height={height}
          stroke="black"
          fill="black"
        />
      );
    }

    const lcmRectangles = [];
    if (
      typeof denominator === "number" &&
      typeof otherDenominator === "number"
    ) {
      const lcmDenominator = lcm(denominator, otherDenominator);
      for (const i of Array(lcmDenominator + 1)
        .fill(0)
        .map((v, i) => i)) {
        rectangles.push(
          <Rectangle
            key={`lcm-rectangle-${i}`}
            x={x + Math.round((i / lcmDenominator) * width)}
            y={y}
            width={1}
            height={height}
            stroke="black"
            strokeDasharray="3 3"
            fill="black"
          />
        );
      }
    }

    return (
      <>
        <Rectangle
          x={x}
          y={y}
          width={Math.round((width * numerator) / denominator)}
          height={height}
          stroke="black"
          fill="orange"
        />
        {rectangles}
        {lcmRectangles}
      </>
    );
  };

  return (
    <Surface width={1000} height={1000}>
      <Rectangle
        x={x}
        y={y1}
        width={width}
        height={height}
        stroke="black"
        fill="white"
      />
      {drawing(
        x,
        y1,
        width,
        height,
        props.numerator1,
        props.denominator1,
        props.denominator2
      )}
      <Layer>
        <text x={10} y={20}>
          {text1}
        </text>
        <text x={10} y={300}>
          {text2}
        </text>
      </Layer>
      <Rectangle
        x={x}
        y={y2}
        width={width}
        height={height}
        stroke="black"
        fill="white"
      />
      {drawing(
        x,
        y2,
        width,
        height,
        props.numerator2,
        props.denominator2,
        props.denominator1
      )}
    </Surface>
  );
}
