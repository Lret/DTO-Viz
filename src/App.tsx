import { useRef, useEffect } from 'react';
import { Engine, NodeEditor } from "rete";

import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import ReactRenderPlugin from 'rete-react-render-plugin';

import NumComponent from './components/graph/components/num';

import './App.css';

// Application
function App() {
  const rete_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Rete mounting
    const container = rete_ref.current;
    if (!container) throw new Error("#rete element was not found.");
    
    // Editor
    const editor = new NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin);
    editor.use(ContextMenuPlugin);

    // Engine
    const engine = new Engine('demo@0.1.0');

    // Register nodes
    const numComponent = new NumComponent();
    editor.register(numComponent);  
    engine.register(numComponent);    

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
          <div ref={rete_ref} className="Rete-container"/>
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

export default App;


// class MyControl extends Rete.Control {
//   constructor(emitter, key, name) {
//     super(key);
//     // this.render = 'react';
//     // this.component = MyReactControl;
//     // this.props = { emitter, name };
//   }
// }

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