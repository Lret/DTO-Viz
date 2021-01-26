import { Console } from "console";
import React, { useState, useEffect } from "react";
import { Control } from "rete";

const NumComponent = ({inital, handleChange, readonly}) => {
  const [value, setValue] = useState(inital || 0);

  return (<input type="number" value={value} readOnly={readonly} onChange={ e => {
      const newValue = +e.target.value;
      handleChange(newValue);
      setValue(newValue);
    }}
  />)
}

export default class NumController extends Control {
  render: string = 'react';
  component = NumComponent;

  constructor(emitter, key, node/*name*/, readonly = false) {
    super(key);

    node.data[key] = node.data[key] ?? 0;
    // this.putData(key, (this.getData(key) ?? 0));

    // @ts-ignore
    this.props = {  
      readonly,
      inital: /*0*/ node.data[key] /*?? 0*/,
      handleChange: (value) => {
        console.log("Value changed", value)
        // @ts-ignore
        // this.props.value = value;
        this.putData(key, value);
        // console.log(node.data[key]);
        // console.log(this.getData(key));
        emitter.trigger("process");
      }
    };
  }

  // setValue(val) {
  //   //@ts-ignore
  //   //this.props.value = val;
  //   this.putData(this.key, val)
  //   // this.update();
  //   emitter.trigger("process");
  //   return val;
  // }
}






// const NumComponent = 
// ({inital, emitter, readonly, onChange, putData, getData}) => {
//   const [value, setValue] = useState(inital || 0);
//
//   return (<input type="number" value={value} readOnly={readonly} onChange={ e => {
//       // onChange(+e.target.value);
//       // setVal(e.target.value);
//       const newValue = e.target.value;
//       setValue(newValue);
//       // console.log(putData)
//       // console.log(getData)
//       // putData(key, newValue);
//       // putData("value", newValue);
//       // console.log(getData("value"))
//       emitter.trigger("process");
//     }}
//   />)
// }

/*
export default class NumController extends Control {
  render: string = 'react';
  component = NumComponent;

  constructor(emitter, key, node/*name* v/, readonly = false) {
    super(key);
    // console.log(key)
    // @ts-ignore
    this.props = { 
      getData: this.getData,
      putData: this.putData,
      emitter, 
      node,/*name* /
      readonly,
      inital: 0,//this.setValue(this.getData(this.key)) ?? 0,//0,//initial,
      // onChange: val => {
      //   console.log("Update")
      //   this.setValue(val);
      //   // @ts-ignore
      //   // this.props.value = val  ;
      //   // this.putData(key, val);
      //   // this.update();
      //
      //   emitter.trigger("process");
      // }
    };
  }

  // setValue(val) {
  //   //@ts-ignore
  //   this.props.value = val;
  //   this.putData(this.key, val)
  //   // this.update();
  //   return val;
  // }
}
*/

// export default class NumController extends Control {
//     protected static _component = ({ value, onChange }) => (
//       <input
//         type="number"
//         value={value}
//         ref={ref => {
//           ref && ref.addEventListener("pointerdown", e => e.stopPropagation());
//         }}
//         onChange={e => onChange(+e.target.value)}
//       />
//     );
//     // emitter: any;
//     props: { readonly: boolean; value: any; onChange: (value: any) => void; };
//     component: ({ value, onChange }: { value: any; onChange: any; }) => JSX.Element;
//  
//     constructor(emitter, key, node, readonly = false) {
//       super(key);
//       // this.emitter = emitter;
//       this.key = key;
//       this.component = NumController._component;
//  
//       const initial = node.data[key] || 0;
//  
//       node.data[key] = initial;
//       this.props = {
//         readonly,
//         value: initial,
//         onChange: value => {
//           this.setValue(value);
//           /*this.*/emitter.trigger("process");
//         }
//       };
//     }
// 
//     setValue(value) {
//       this.props.value = value;
//       this.putData(this.key, value);
//       this.update();
//     }
//
//     update() {
//         // throw new Error("Method not implemented.");
//     }
//   }