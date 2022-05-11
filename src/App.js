import "./App.css";
import { Hand } from "./Hand";
import ReactFlow, { useEdgesState, useNodesState } from "react-flow-renderer";
import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import {
  Cards,
  DirectedEdges,
  ENCRYPT_RANDOM_NUMBER,
  GenerateEdges,
  GenerateNodes,
  InitialData,
  INITIAL_STATE,
  Nodes,
  PICK_RANDOM_NUMBER,
  SHARE_ENCRYPTION,
  Table,
} from "./Graph";

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
    alignItems: "center",
    marginLeft: "64px",
    marginRight: "0px",
  },
  PlayersWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  public: {
    height: "300px",
    borderColor: "black",
    borderWidth: "2px",
    borderStyle: "solid",
    width: "1200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  flowWrapper: {
    width: "1200px",
    height: "500px",
    borderWidth: "2px",
    borderColor: "black",
    borderStyle: "solid",
  },
  publicCol: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
  publicCol2: {
    height: "100%",
    display: "flex",
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
};

const STEPS = [
  { f: INITIAL_STATE, props: {} },
  { f: PICK_RANDOM_NUMBER, props: { id: "0", number: 42 } },
  { f: PICK_RANDOM_NUMBER, props: { id: "1", number: "?" } },
  { f: PICK_RANDOM_NUMBER, props: { id: "2", number: "?" } },
  { f: PICK_RANDOM_NUMBER, props: { id: "3", number: "?" } },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: "0", number: 42, result: [0xffff, 0xbeef] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: "1", number: "?", result: ["?", "?"] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: "2", number: "?", result: ["?", "?"] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: "3", number: "?", result: ["?", "?"] },
  },
  {
    f: SHARE_ENCRYPTION,
    props: { from: "0", encryption: [0xffff, 0xbeef] },
  },
  {
    f: SHARE_ENCRYPTION,
    props: { from: "1", encryption: ["?", "?"] },
  },
  {
    f: SHARE_ENCRYPTION,
    props: { from: "2", encryption: ["?", "?"] },
  },
  {
    f: SHARE_ENCRYPTION,
    props: { from: "3", encryption: ["?", "?"] },
  },
];

const EXECUTE_STEP = (
  table,
  setTable,
  cards,
  setCards,
  directedEdges,
  setDirectedEdges,
  ourNodes,
  setOurNodes,
  data,
  setData,
  N,
  SN
) => {
  STEPS[N].f(
    table,
    setTable,
    cards,
    setCards,
    directedEdges,
    setDirectedEdges,
    ourNodes,
    setOurNodes,
    data,
    setData,
    STEPS[N].props
  );
  SN(N + 1);
};

function App() {
  // state machine
  const [CURRENT_STEP, SET_CURRENT_STEP] = useState(0);

  // Nodes State
  const [ourNodes, setOurNodes] = useState(Nodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(GenerateNodes(Nodes));
  useEffect(() => {
    setNodes(GenerateNodes(ourNodes));
  }, [ourNodes, setNodes]);

  // Edges State
  const [directedEdges, setDirectedEdges] = useState(DirectedEdges);
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    GenerateEdges(directedEdges)
  );
  useEffect(() => {
    setEdges(GenerateEdges(directedEdges));
  }, [directedEdges, setEdges]);

  // Cards State
  const [cards, setCards] = useState(Cards);
  const [table, setTable] = useState(Table);

  // Data State
  const [data, setData] = useState(InitialData);

  if (CURRENT_STEP === 0) {
    STEPS[0].f(
      table,
      setTable,
      cards,
      setCards,
      directedEdges,
      setDirectedEdges,
      ourNodes,
      setOurNodes,
      data,
      setData,
      {}
    );
    SET_CURRENT_STEP(CURRENT_STEP + 1);
  }

  return (
    <div style={SS.mainWrapper}>
      <div style={SS.columnWrapper}>
        <div style={SS.column2}>
          <div style={SS.simulation}>
            <h3> Simulation </h3>
            {/* <h5 style={{ marginTop: "0" }}>{STEPS[CURRENT_STEP].f.name}</h5> */}
            <button
              onClick={() => {
                if (CURRENT_STEP >= STEPS.length) return;
                EXECUTE_STEP(
                  table,
                  setTable,
                  cards,
                  setCards,
                  directedEdges,
                  setDirectedEdges,
                  ourNodes,
                  setOurNodes,
                  data,
                  setData,
                  CURRENT_STEP,
                  SET_CURRENT_STEP
                );
              }}
              style={{ marginBottom: "32px" }}
            >
              Next
            </button>
            <div style={SS.flowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                panOnDrag={false}
                zoomOnPinch={false}
                zoomOnScroll={false}
                nodesDraggable={false}
              />
            </div>
          </div>
          <div style={SS.common}>
            <h3> Public Information </h3>
            <div style={SS.public}>
              <div style={SS.publicCol}>
                <h4> Me </h4>
                <div style={{ fontSize: "10px" }}>
                  {data.filter((d) => d.id === "0")[0].d.map((d) => d)}
                </div>
              </div>
              <div style={SS.publicCol}>
                <h4> Player 1 </h4>
                <div style={{ fontSize: "10px" }}>
                  {data.filter((d) => d.id === "1")[0].d.map((d) => d)}
                </div>
              </div>
              <div style={SS.publicCol}>
                <h4> Player 2 </h4>
                <div style={{ fontSize: "10px" }}>
                  {data.filter((d) => d.id === "2")[0].d.map((d) => d)}
                </div>
              </div>
              <div style={SS.publicCol}>
                <h4> Player 3 </h4>
                <div style={{ fontSize: "10px" }}>
                  {data.filter((d) => d.id === "3")[0].d.map((d) => d)}
                </div>
              </div>
              <div style={SS.publicCol2}>
                <h4> Common </h4>
                <div style={{ fontSize: "10px" }}>
                  {data.filter((d) => d.id === "common")[0].d.map((d) => d)}
                </div>
              </div>
              <div style={SS.publicCol}></div>
            </div>
          </div>
        </div>
        <div style={SS.column}>
          <h1>Result</h1>
          <h2> Table </h2>
          <Hand cards={table} />
          <h2> Me </h2>
          <Hand cards={cards.filter((c) => c.id === "0")[0]?.cards} />
          <div style={SS.PlayersWrapper}>
            {cards.map((x) => {
              if (x.id !== "0") {
                return (
                  <div style={SS.column}>
                    <h3> Player {x.id} </h3>
                    <Hand cards={x.cards} />
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
