import { Component, Output } from "rete";
import NumControl from '../controls/num';
import { numSocket } from "../sockets";

export default class NumComponent extends Component {
  constructor() {
    super("Number");
  }

  builder(node) {
    var out1 = new Output("num", "Number", numSocket);
    var ctrl = /*new*/ NumControl(this.editor, "num", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    console.log(node.data)
    outputs["num"] = node.data.num;
  }
}

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