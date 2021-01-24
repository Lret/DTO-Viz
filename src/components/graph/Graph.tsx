import { useRef, useEffect } from 'react';
import { Engine, NodeEditor } from "rete";

import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import ReactRenderPlugin from 'rete-react-render-plugin';

import NumComponent from './components/num';
import './Graph.css';

// import with Kernel?
const components = [
  new NumComponent()
];

function Graph () {
    // Variables
    const rete_ref = useRef<HTMLDivElement>(null);

    // Functions
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
      components.forEach(component => {
        editor.register(component);  
        engine.register(component);
      }); 
  
      // Event register
      editor.on(["process", "nodecreated", "noderemoved", "connectioncreated", "connectionremoved"], async () => {
          await engine.abort();
          await engine.process(editor.toJSON());
      });
  
      editor.view.resize();
      editor.trigger('process');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[/*Run once*/]);

    // View
    return (
      <div ref={rete_ref} className="Graph-container"/>
    );
}

export default Graph;