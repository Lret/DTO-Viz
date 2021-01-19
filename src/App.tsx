// @ts-nocheck
import {useRef, useEffect} from 'react';
import Rete from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import ReactRenderPlugin/*, { Node, Socket, Control }*/ from 'rete-react-render-plugin';
import AlightRenderPlugin from 'rete-alight-render-plugin';
import './App.css';

const numSocket = new Rete.Socket('Number value');

////////// Control

class MessageControl extends Rete.Control {
    constructor(emitter, msg) {
        super("num");
        this.emitter = emitter;
        this.template = '<input type="number" :value="value" @input="change($event)"/>';

        this.scope = {
            msg,
            change: this.change.bind(this)
        };
    }

    change(e) {
        this.scope.value = +e.target.value;
        this.update();
    }

    update() {
        this.putData('num', this.scope.value)
        this.emitter.trigger('process');
        this._alight.scan();
    }

    mounted() {
        this.scope.value = this.getData('num') || 0;
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this._alight.scan()
    }
}

//////////


//#region Node
class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
    // this.data.component = MyNode;
  }

  builder(node) {
    const _in = new Rete.Input('num', 'Number', numSocket, true);
    node.addInput(_in);

    const _out = new Rete.Output('num', 'Number', numSocket);
    node.addOutput(_out);

    var numControl = new MessageControl(this.editor, node.data.num);
    node.addControl(numControl); // nodes are chainable

    return node;
  }

  worker(node, inputs, outputs) {
    console.log(inputs?.num[0])
    // console.log(this.name);
    // console.log(this.data);
    // console.log(node);
    // console.log(inputs);
    // console.log(outputs); 
    // console.log()
    outputs['num'] = node.data.num;
  }
}
//#endregion

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
    // editor.use(ReactRenderPlugin);
    editor.use(AlightRenderPlugin);
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
