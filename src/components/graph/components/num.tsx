import { Component, Output } from "rete";
import NumControl from '../controls/num';
import { anySocket, numSocket } from "../sockets";

export default class NumComponent extends Component {
  key = "obj" 
  node;
  // objOut = new Output(this.key, "Object", numSocket);

  constructor() {
    super("Object");
  }

  builder(node) {
    var out1 = new Output(this.key, "Object", numSocket); //this.objOut;
    var ctrl = /*new*/ NumControl(this.editor, this.key, node);
    // console.log(node)
    this.node = node;
    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    console.log(/*node.data, */node.data[this.key], node.data[this.key].title);
    // this.node.outputs = [this.node.outputs[this.key]];
    // this.node.outputs.clear();
    // this.node.outputs.set(this.key, node.data);

    // Filter non-obj keys, Should be made prettier
    for (let k of this.node.outputs.keys()) {
      if (k !== this.key ) 
      // {
        // console.log("cleared", k)
        this.node.outputs.delete(k);
      // } else {
        // console.log("Spared", k)
      // }
    }

    Object.entries(node.data[this.key]).forEach( ([key, value]) => {
      // Create output
      const newOut = new Output(key, key.charAt(0).toUpperCase() + key.slice(1), anySocket);
      this.node.addOutput(newOut);
      // node.addOutput(newOut);
      // Set Value
      outputs[key] = value
    });
    this.node.update();
    // if(this.node.outputs.has("id")) this.node.outputs.delete("id");
    // console.log(this.node.outputs)
    // console.log("out", node) 

    // outputs = [
    //   this.objOut, 
    //   ...Object.entries(node.data).map( ([key, value]) => 
    //     new Output(key, (key.charAt(0).toUpperCase() + key.slice(1)), anySocket)
    //   )
    // ]
    // Object.entries(node.data).forEach( ([key, value]) => outputs[key] = value ); 
    // console.log(Object.entries(node.data[this.key]).map(([key, value]) => `${key} : ${value}`));
    outputs[this.key] = node.data[this.key]; // node.data.obj
  }
}

/* Real num
export default class NumComponent extends Component {
  constructor() {
    super("Number");
  }

  builder(node) {
    var out1 = new Output("num", "Number", numSocket);
    var ctrl = /*new* / NumControl(this.editor, "num", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    console.log(node.data)
    outputs["num"] = node.data.num;
  }
}
*/

/*
import { Component, Input, Output } from "rete"
import { numSocket } from "../sockets";
import NumControl from "../controls/num";

export default class NumComponent extends Component {
    trueName: string;
    data: any;

    constructor() {
      super("Number");
      this.trueName = "Number" 
    }
  
    builder(node) {
      var in1  = new Input("num", "Number", numSocket);
      var out1 = new Output("num", "Number", numSocket);
      var ctrl = new NumControl(this.editor, "num", node);
  
      return node 
        .addInput(in1)
        .addControl(ctrl)
        .addOutput(out1);
    }
  
    worker(node, inputs, outputs) {
      console.log(node.data, inputs)
      outputs["num"] = inputs?.num[0] ?? node.data.num;
      // this.name = `${this.trueName}\n${outputs["num"]}`
      // console.log(outputs["num"])
      this.data.name = `${this.trueName}\n${outputs["num"]}`;
    }
  }
  */