import "bootstrap/dist/css/bootstrap.css";

import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import _ from "lodash";

const Multiplication = props => {
  if (_.isNil(props.m) || _.isNil(props.n)) {
    return [];
  }
  let counter = 1;
  const rows = [];
  for (let i = 1; i <= props.n; i++) {
    const row = [];
    for (let j = 1; j <= props.m; j++) {
      row.push(
        <div key={`col-${counter}`} class="multiplication-tile">
          {counter}
        </div>
      );
      counter += 1;
    }
    rows.push(<Row key={`row-${counter}`}>{row}</Row>);
  }
  return <Container>{rows}</Container>;
};

const validNumbers = new Set([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10"
]);

export default function Fraction(props) {
  const [n, setN] = useState(null);
  const [m, setM] = useState(null);

  const handleChange = setParamFunc => event => {
    if (validNumbers.has(event.target.value)) {
      setParamFunc(parseInt(event.target.value));
    }
  };

  return (
    <>
      <div>
        <input placeholder="n" type="text" onChange={handleChange(setN)} />
        <input placeholder="m" type="text" onChange={handleChange(setM)} />
      </div>
      <Multiplication n={n} m={m}></Multiplication>
    </>
  );
}
