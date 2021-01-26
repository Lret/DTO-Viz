import { Console } from "console";
import React from "react";
import { Control } from "rete";

const MyReactControl = () => {
  return (
      <div>Hello !</div>
  )
}

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

export default class NumController extends Control {
  render: string = 'react';
  // component: FunctionComponent<Props>
  component = ({ value, onChange }) => {
    // return (<div>Hello</div>)
    console.log(value, onchange);
    return (
      <input 
        type="number" 
        value={value} 
        ref={ref => {ref && ref.addEventListener("pointerdown", e => e.stopPropagation());}}
        onChange={e => onChange(+e.target.value)}
      />
    );
  };

  constructor(emitter, key, node/*name*/, readonly = false) {
    super(key);
    // @ts-ignore
    // this.component = MyReactControl;

   // EXTRA 
   const initial = node.data[key] || 0;
   node.data[key] = initial;

    // @ts-ignore
    this.props = { 
      readonly,
      emitter, 
      node,/*name*/
      value: initial,
      onChange: value => {
        // this.setValue(value);
        // @ts-ignore
        this.props.value = value;
        this.putData(key, value);
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