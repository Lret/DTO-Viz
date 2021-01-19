// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import Rete/*, { Control }*/ from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import ReactRenderPlugin, { Node, Socket, Control }  from 'rete-react-render-plugin';
// import AlightRenderPlugin from 'rete-alight-render-plugin';
import './App.css';

const numSocket = new Rete.Socket('Number value');

// Node
export class MyNode extends Node {
  render() {
    const { node, bindSocket, bindControl } = this.props;
    const { outputs, controls, inputs, selected } = this.state;

    return (
      <div className={`node ${selected}`} style={{ background: "grey" }}>
        <div className="title">
          {"<<"} {node.name} {">>"}
        </div>
        {/* Outputs */}
        {outputs.map(output => (
          <div className="output" key={output.key}>
            <div className="output-title">{output.name}</div>
            <Socket
              type="output"
              socket={output.socket}
              io={output}
              innerRef={bindSocket}
            />
          </div>
        ))}
        {/* Controls */}
        {controls.map(control => (
          <Control
            className="control"
            key={control.key}
            control={control}
            innerRef={bindControl}
          />
        ))}
        {/* Inputs */}
        {inputs.map(input => (
          <div className="input" key={input.key}>
            <Socket
              type="input"
              socket={input.socket}
              io={input}
              innerRef={bindSocket}
            />
            {!input.showControl() && (
              <div className="input-title">{input.name}</div>
            )}
            {input.showControl() && (
              <Control
                className="input-control"
                control={input.control}
                innerRef={bindControl}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}

// Control
class NumControl extends Rete.Control {
  static component = ({ value, onChange }) => (
    <input
      type="number"
      value={value}
      ref={ref => {
        ref && ref.addEventListener("pointerdown", e => e.stopPropagation());
      }}
      onChange={e => onChange(+e.target.value)}
    />
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = NumControl.component;

    const initial = node.data[key] || 0;

    node.data[key] = initial;
    this.props = {
      readonly,
      value: initial,
      onChange: v => {
        this.setValue(v);
        this.emitter.trigger("process");
      }
    };
  }

  setValue(val) {
    this.props.value = val;
    this.putData(this.key, val);
    this.update();
  }
}

// Component
class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
  }

  builder(node) {
    var out1 = new Rete.Output("num", "Number", numSocket);
    var ctrl = new NumControl(this.editor, "num", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    console.log(node.data)
    outputs["num"] = node.data.num;
  }
}


// Application
function App() {
  const rete_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Rete mounting
    const container = rete_ref.current;
    if (!container) throw new Error("#rete element was not found.");
    
    // Editor
    const editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin);
    // editor.use(AlightRenderPlugin);
    editor.use(ContextMenuPlugin);

  
    // Engine
    const engine = new Rete.Engine('demo@0.1.0');

    // Register nodes
    const numComponent = new NumComponent();
    editor.register(numComponent);  
    engine.register(numComponent);    

    // numComponent.createNode().then((num) => {
    //   num.position = [80, 200];
    //   editor.addNode(num);
    // });

    // (async () => {
    //   const num = await numComponent.createNode();
    //   num.position = [80, 200];
    //   editor.addNode(num);
    // })();

    
    // const n1 = await components[0].createNode({ num: 2 });
    // const n2 = await components[0].createNode({ num: 0 });
    // const add = await components[1].createNode();

    // n1.position = [80, 200];
    // n2.position = [80, 400];
    // add.position = [500, 240];

    // editor.addNode(n1);
    // editor.addNode(n2);
    // editor.addNode(add);

    // editor.connect(n1.outputs.get('num'), add.inputs.get('num1'));
    // editor.connect(n2.outputs.get('num'), add.inputs.get('num2'));

    editor.on(["process", "nodecreated", "noderemoved", "connectioncreated", "connectionremoved"], async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
    });

    editor.view.resize();
    editor.trigger('process');
    console.log("Rete inialized")
  },[/*Run once*/])

  // Render
  return (
    <div className="App">
      <header className="App-header">
        <div style={{height:"80vh", width:"80vw"}}> 
          <div ref={rete_ref} style={{
            borderRadius:"12px",
            backgroundColor:'rgb(26, 28, 29)',
            backgroundSize:'30px 30px',
            backgroundImage:`linear-gradient(
              0deg,
              transparent 24%,
              rgba(255, 255, 255, 0.04) 25%,
              rgba(255, 255, 255, 0.04) 26%,
              transparent 27%,
              transparent 74%,
              rgba(255, 255, 255, 0.04) 75%,
              rgba(255, 255, 255, 0.04) 76%,
              transparent 77%,
              transparent
            ),
            linear-gradient(
              90deg,
              transparent 24%,
              rgba(255, 255, 255, 0.04) 25%,
              rgba(255, 255, 255, 0.04) 26%,
              transparent 27%,
              transparent 74%,
              rgba(255, 255, 255, 0.04) 75%,
              rgba(255, 255, 255, 0.04) 76%,
              transparent 77%,
              transparent
            )`
          }}/>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
      </header>
    </div>
  );
}


// class MyControl extends Rete.Control {
//   constructor(emitter, key, name) {
//     super(key);
//     // this.render = 'react';
//     // this.component = MyReactControl;
//     // this.props = { emitter, name };
//   }
// }

export default App;
