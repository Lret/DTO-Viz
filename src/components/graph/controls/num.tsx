import { Console } from "console";
import React, { useState, useEffect } from "react";
import { Control } from "rete";

// class MyReactControl extends React.Component {
 
//   componentDidMount() {
//       this.props.mounted();
//   }
 
//   render() {
//     return (
//         <input type="number" value={this.props.value} readOnly={this.props.readonly} onChange={e => this.props.onChange(+e.target.value)}/>
//     )
//   }
// }


// class MyReactControl extends React.Component {
//
//   componentDidMount() {
//       // this.props.getData
//       // this.props.putData
//   }
//
//   render() {
//     return (
//         <div>Hello !</div>
//     )
//   }
// }

// const _component = ({ value, onChange }) => {
//   useEffect(() => {
//     console.log("TT")
//   });
//
//   console.log(value, onchange);
//   return (
//     <input 
//       type="number" 
//       value={value} 
//       ref={ref => {ref && ref.addEventListener("pointerdown", e => e.stopPropagation());}}
//       onChange={e => onChange(+e.target.value)}
//     />
//   );
// };

export default class NumController extends Control {
  render: string = 'react';

  // component: FunctionComponent<Props>
  
  //component = //_component;
  //  ({value, readonly, onChange/*, mounted*/}) => {
  //    console.log("init")
  //    // mounted();
  //    return (<input type="number" value={value} readOnly={readonly} onChange={e => onChange(+e.target.value)}/>)
  //  }

  constructor(emitter, key, node/*name*/, readonly = false) {
    super(key);
    // @ts-ignore
    this.component = //MyReactControl;
    ({value, readonly, onChange/*, mounted*/}) => {
      console.log("init", value)
      // mounted();
      return (<input type="number" value={value} readOnly={readonly} onChange={e => onChange(+e.target.value)}/>)
    };

   // EXTRA 
  //  const initial = node.data[key] || 0;
  //  node.data[key] = initial;

    // @ts-ignore
    this.props = { 
      readonly,
      emitter, 
      node,/*name*/
      value: 0,//this.setValue(this.getData(this.key)) ?? 0,//0,//initial,
      onChange: val => {
        console.log("Update", val)
        this.setValue(val);
        // @ts-ignore
        // this.props.value = val  ;
        // this.putData(key, val);
        // this.update();

        emitter.trigger("process");
      }
    };
// this.props = { emitter, node/*name*/ };

//    const initial = node.data[key] || 0;
//       node.data[key] = initial;
//       this.props = {
//         readonly,
//         value: initial,
//         onChange: value => {
//           this.setValue(value);
//           /*this.*/emitter.trigger("process");
//         }
//       };
  }

  setValue(val) {
    //@ts-ignore
    this.props.value = val;
    this.putData(this.key, val)
    // this.update();
    return val;
  }
}

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