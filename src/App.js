import "./App.css";
import { Hand } from "./Hand";
import ReactFlow, { useEdgesState, useNodesState } from "react-flow-renderer";
import { useEffect, useState } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

const SS = {
  mainWrapper: {
    display: "flex",
    minWidth: "100vw",
    minHeight: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  columnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "100vh",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  column2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    minHeight: "100%",
  },
  simulation: {
    display: "flex",
    flexDirection: "column",
    flex: 2,
    alignItems: "center",
    minWidth: "100%",
    marginLeft: "64px",
    marginRight: "0px",
  },
  common: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
};

const Table = [
  { suit: "club", rank: "1" },
  { suit: "spade", rank: "3" },
  { suit: "heart", rank: "7" },
  { suit: "diamond", rank: "1" },
  { suit: "club", rank: "2" },
];

const Peers = [
  {
    id: "0",
    data: {
      cards: [
        { suit: "club", rank: "3" },
        { suit: "spade", rank: "4" },
      ],
      label: "Me",
    },
    position: { x: 100, y: 100 },
    sourcePosition: "bottom",
    targetPosition: "bottom",
  },
  {
    id: "1",
    data: {
      cards: [{ rank: "back" }, { rank: "back" }],
      label: "Player 1",
    },
    position: { x: 930, y: 100 },
    targetPosition: "bottom",
    sourcePosition: "bottom",
  },
  {
    id: "2",
    data: {
      cards: [{ rank: "back" }, { rank: "back" }],
      label: "Player 2",
    },
    position: { x: 100, y: 500 },
    targetPosition: "top",
    sourcePosition: "top",
  },
  {
    id: "3",
    data: {
      cards: [{ rank: "back" }, { rank: "back" }],
      label: "Player 3",
    },
    position: { x: 930, y: 500 },
    targetPosition: "top",
    sourcePosition: "top ",
  },
];

const Edges = [
  {
    id: "e0-1",
    source: "0",
    target: "1",
    animated: true,
    // style: {
    //   stroke: "red",
    //   strokeWidth: "5px",
    // },
  },
  { id: "e0-2", source: "0", target: "2", animated: true },
  { id: "e0-3", source: "0", target: "3", animated: true },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(Peers);
  const [edges, setEdges, onEdgesChange] = useEdgesState(Edges);

  const [MeName, setMeName] = useState("Me");

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "0") {
          node.data = {
            ...node.data,
            label: MeName,
          };
        }
        return node;
      })
    );
  }, [MeName, setNodes]);

  return (
    <div style={SS.mainWrapper}>
      <div style={SS.columnWrapper}>
        <div style={SS.column2}>
          <div style={SS.simulation}>
            <h3> Simulation </h3>
            <Latex strict>$E(g^r) = 123$</Latex>
            <div
              style={{
                width: "1200px",
                height: "600px",
                borderWidth: "2px",
                borderColor: "black",
                borderStyle: "solid",
              }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                panOnDrag={false}
                zoomOnPinch={false}
              />
            </div>
          </div>
          <div style={SS.common}>
            <h3> Public Information </h3>
          </div>
        </div>
        <div style={SS.column}>
          <h1>Result</h1>
          <h2> Table </h2>
          <Hand cards={Table} />
          <h2> Me </h2>
          <Hand cards={Peers[0].data.cards} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {Peers.map((x) => {
              if (x.id !== "0") {
                return (
                  <div style={SS.column}>
                    <h3> Player {x.id} </h3>
                    <Hand cards={x.data.cards} />
                  </div>
                );
              }
              return <></>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
