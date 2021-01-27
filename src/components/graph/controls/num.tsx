import React, { useState } from "react";
import { Control } from "rete";

const NumComponent = ({inital, handleChange, readonly}) => {
  const [value, setValue] = useState(inital || 0);
  // const ... = useController(emitter, key, node, readonly = false);

  return (<input type="number" value={value} readOnly={readonly} onChange={ e => {
      const newValue = +e.target.value;
      handleChange(newValue);
      setValue(newValue);
    }}
  />)

  // return controller
}

export default class NumController extends Control {
  render: string = 'react';
  component = NumComponent;

  constructor(emitter, key, node/*name*/, readonly = false) {
    super(key);

    node.data[key] = node.data[key] ?? 0;

    // @ts-ignore
    this.props = {  
      readonly,
      inital: node.data[key],
      handleChange: (value) => {
        this.putData(key, value);
        emitter.trigger("process");
      }
    };
  }
}

// Create builder
// Or create hook