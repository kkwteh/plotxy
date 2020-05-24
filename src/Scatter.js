import _ from "lodash";
import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ZAxis,
  ReferenceLine,
  ReferenceDot,
  ReferenceArea,
  ErrorBar,
  LabelList
} from "recharts";

export default function MyScatter(props) {
  const [paramA, setParamA] = useState(0);
  const [paramB, setParamB] = useState(0);
  const [paramC, setParamC] = useState(0);
  const [data, setData] = useState([]);

  const minX = -10;
  const maxX = 10;
  const minY = -3000;
  const maxY = 3000;

  const handleChange = setParamFunc => event => {
    setParamFunc(parseFloat(event.target.value));
    const changeData = [];
    for (const i of Array(100)
      .fill(0)
      .map((v, i) => i)) {
      const x = (minX * (100 - i)) / 100 + (maxX * i) / 100;
      const y = paramA * x ** 2 + paramB * x + paramC;
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
        changeData.push({
          x: x,
          y: y
        });
      }
    }
    setData(changeData);
  };
  return (
    <>
      <div>
        <input placeholder="a" type="text" onChange={handleChange(setParamA)} />
        <input placeholder="b" type="text" onChange={handleChange(setParamB)} />
        <input placeholder="c" type="text" onChange={handleChange(setParamC)} />
      </div>
      <div className="scatter-charts">
        <div className="scatter-chart-wrapper">
          <ScatterChart
            width={400}
            height={400}
            margin={{ top: 20, right: 20, bottom: 0, left: 20 }}
          >
            <XAxis
              type="number"
              dataKey="x"
              name="x"
              unit=""
              domain={[-10, 10]}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="y"
              unit=""
              domain={[-3000, 3000]}
            />
            <CartesianGrid />
            <Tooltip />
            <Legend />
            <Scatter
              name={`${paramA}x^2 + ${paramB}x + ${paramC}`}
              data={data}
              fill="#ff7300"
            />
          </ScatterChart>
        </div>
      </div>
    </>
  );
}
