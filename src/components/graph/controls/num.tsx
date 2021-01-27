import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { Control } from "rete";

interface BaseProps<T> {
  initalValue: T,
  updateValue: (value : T) => /*T |*/ void,
  readonly : boolean  
}

class BaseController<T, P extends BaseProps<T> = BaseProps<T>> extends Control {
  render: string = 'react';
  component: /*JSX.Element |*/FunctionComponent<P>;
  props: P;

  constructor(emitter, key: string, node, template: FunctionComponent<P>, initalValue : T, props = {}, readonly: boolean = false) {
    // Set parents key
    super(key);

    // Set template // Could also be set with Generic
    this.component = template;

    // Set Inital value
    node.data[key] = node.data[key] ?? initalValue;

    // Set Props
    this.props = {
      initalValue: node.data[key],
      updateValue: (value) => {
        this.putData(key, value);
        emitter.trigger("process");
        //return value;
      },
      readonly,
      ...props
    } as P;
  }
}

function MakeController<T, P extends BaseProps<T> = BaseProps<T>>(inital : T, template : FunctionComponent<P>, props /*: child_P*/ = {}) : (emitter, key: string, node, readonly?: boolean) => BaseController<T, P> {
  return (emitter, key: string, node, readonly: boolean = false) => 
    new BaseController<T, P>(emitter, key, node, template, inital, props, readonly);
}


function useWrapState<S>(initialState: S | (() => S), setEffectState: (value: S) => void): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    setEffectState(value)
  }, [setEffectState, value]);

  return [value, setValue];
  // return [value, (value: S) => {
  //   sideEffectState(value);
  //   setValue(value);
  // }]
};

const NumComponent = ({initalValue, updateValue, readonly}: BaseProps<number>) => {
  const [value, setValue] = useWrapState(initalValue, updateValue);
  return (<input type="number" value={value} readOnly={readonly} onChange={ e => setValue(+e.target.value)}
  />)
}

const NumController = MakeController<number>(0, NumComponent);

// export default class NumController extends BaseController<number> {
//   constructor(emitter, key: string, node, readonly: boolean = false) {
//     super(emitter, key, node, NumComponent, 0, readonly)
//   }
// }

export default NumController;