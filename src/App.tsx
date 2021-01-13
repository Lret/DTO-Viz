import {useRef, useEffect} from 'react';
import Rete from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
// import VueRenderPlugin from 'rete-vue-render-plugin';
import ReactRenderPlugin/*, { Node, Socket, Control }*/ from 'rete-react-render-plugin';
// import ContextMenuPlugin from 'rete-context-menu-plugin';
import './App.css';

const numSocket = new Rete.Socket('Number value');

class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
    // this.data.component = MyNode;
  }
  // constructor() {
  //   super('Number');
  // }

  builder(node) {
    // let out = new Rete.Output('num', 'Number', numSocket);
    let out = new Rete.Output('num', 'Number', numSocket);

    node.addOutput(out);

    return node;
  }

  worker(node, inputs, outputs) {
    outputs['num'] = node.data.num;
  }
}


function App() {
  const rete_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Creation
    const container = rete_ref.current;
  
    // Rete
    //const container = document.getElementById('rete');
    if (!container) throw new Error("#rete element was not found.");
    const editor = new Rete.NodeEditor('demo@0.1.0', container);
  
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin);
    // editor.use(VueRenderPlugin);
    // editor.use(ContextMenuPlugin);
  
    const numComponent = new NumComponent();
    editor.register(numComponent);  
    //
    
    // Events
    const engine = new Rete.Engine('demo@0.1.0');
    engine.register(numComponent);

    //
    // numComponent.createNode().then((num) => {
    //   num.position = [80, 200];
    //   editor.addNode(num);
    // });

    (async () => {
      const num = await numComponent.createNode();
      num.position = [80, 200];
      editor.addNode(num);
    })();

    
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
    //

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
        {/* <div id="rete"></div> */}
        <div ref={rete_ref} style={{height:"80% !importent", width:"100%"}} />
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
