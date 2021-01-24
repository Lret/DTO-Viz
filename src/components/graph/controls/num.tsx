import { Control } from "rete";

export default class NumController extends Control {
    protected static _component = ({ value, onChange }) => (
      <input
        type="number"
        value={value}
        ref={ref => {
          ref && ref.addEventListener("pointerdown", e => e.stopPropagation());
        }}
        onChange={e => onChange(+e.target.value)}
      />
    );
    emitter: any;
    props: { readonly: boolean; value: any; onChange: (v: any) => void; };
    component: ({ value, onChange }: { value: any; onChange: any; }) => JSX.Element;
  
    constructor(emitter, key, node, readonly = false) {
      super(key);
      this.emitter = emitter;
      this.key = key;
      this.component = NumController._component;
  
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

    update() {
        // throw new Error("Method not implemented.");
    }
  }