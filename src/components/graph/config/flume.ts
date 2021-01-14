import { FlumeConfig, Colors, Controls } from 'flume'

const config = new FlumeConfig()

config
  .addPortType({
    type: "string",
    name: "string",
    label: "Text",
    color: Colors.red,
    controls: [
      Controls.text({
        name: "string",
        label: "Text"
      })
    ]
  })
  .addNodeType({
    type: "string",
    label: "description",
    description: "Outputs a string of text",
    inputs: (ports: any) => [
      ports.string()
    ],
    outputs: (ports: any) => [
      ports.string()
    ]
  })

export default config;