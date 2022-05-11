import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

const SS = {
  node_title: {
    marginBottom: 0,
    marginTop: 0,
  },
};

export const DirectedEdges = [
  { a: "0", b: "1", color: "gray" },
  { a: "0", b: "2", color: "gray" },
  { a: "0", b: "3", color: "gray" },
  { a: "1", b: "2", color: "gray" },
  { a: "1", b: "3", color: "gray" },
  { a: "2", b: "3", color: "gray" },
];

const DirectedEdgeToFlowEdge = (edge) => {
  return {
    id: `e${edge.a}-${edge.b}`,
    source: edge.a,
    target: edge.b,
    animated: edge.color === "green" || edge.color === "red",
    style: {
      stroke: edge.color,
      strokeWidth: "4px",
    },
  };
};

export const GetEdge = (state, from, to) => {
  const atob = state.filter((edge) => edge.a === from && edge.b === to);
  if (atob.length > 0) {
    return atob[0];
  }

  const btoa = state.filter((edge) => edge.b === from && edge.a === to);
  if (btoa.length > 0) {
    return btoa[0];
  }

  return null;
};

export const GenerateEdges = (state) => {
  const edges = [
    DirectedEdgeToFlowEdge(GetEdge(state, "0", "1")),
    DirectedEdgeToFlowEdge(GetEdge(state, "0", "2")),
    DirectedEdgeToFlowEdge(GetEdge(state, "0", "3")),
    DirectedEdgeToFlowEdge(GetEdge(state, "1", "2")),
    DirectedEdgeToFlowEdge(GetEdge(state, "1", "3")),
    DirectedEdgeToFlowEdge(GetEdge(state, "2", "3")),
  ];

  // return edges.map((e) => DirectedEdgeToFlowEdge(e));
  return edges;
};

export const SetEdgeColor = (state, setter, from, to, color) => {
  const newState = [...state];
  let e = GetEdge(newState, from, to);
  e.color = color;
  setter(newState);
};

export const Cards = [
  // {
  //   id: "0",
  //   cards: [
  //     { suit: "club", rank: "3" },
  //     { suit: "spade", rank: "4" },
  //   ],
  // },
  // {
  //   id: "1",
  //   cards: [{ rank: "back" }, { rank: "back" }],
  // },
  // {
  //   id: "2",
  //   cards: [{ rank: "back" }, { rank: "back" }],
  // },
  // {
  //   id: "3",
  //   cards: [{ rank: "back" }, { rank: "back" }],
  // },
];

export const Table = [];

export const Nodes = [
  {
    id: "0",
    label: <h4 style={SS.node_title}>Me</h4>,
    position: { x: 100, y: 25 },
    sourcePosition: "bottom",
    targetPosition: "bottom",
  },
  {
    id: "1",
    label: <h4 style={SS.node_title}>Player 1</h4>,
    position: { x: 930, y: 25 },
    targetPosition: "bottom",
    sourcePosition: "bottom",
  },
  {
    id: "2",
    label: <h4 style={SS.node_title}>Player 2</h4>,
    position: { x: 100, y: 400 },
    targetPosition: "top",
    sourcePosition: "top",
  },
  {
    id: "3",
    label: <h4 style={SS.node_title}>Player 3</h4>,
    position: { x: 930, y: 400 },
    targetPosition: "top",
    sourcePosition: "top ",
  },
];

export const GenerateNodes = (state) => {
  const nodes = [];
  for (const n of state) {
    nodes.push({
      id: n.id,
      data: {
        label: n.label,
      },
      position: n.position,
      targetPosition: n.targetPosition,
      sourcePosition: n.sourcePosition,
      style: {
        width: "200px ",
      },
    });
  }

  return nodes;
};

export const GetCards = (state, id) => {
  const res = state.filter((cc) => cc.id === id);
  if (res.length > 0) {
    return res[0];
  }

  return null;
};

export const GetNode = (state, id) => {
  const res = state.filter((n) => n.id === id);
  if (res.length > 0) {
    return res[0];
  }

  return null;
};

export const ChangeLabel = (state, setter, id, label) => {
  const newState = [...state];
  let n = GetNode(newState, id);
  n.label = label;
  setter(newState);
};

export const AddCard = (state, setter, id, newCard) => {
  const newState = [...state];
  const p = newState.filter((pp) => p.id === id)[0];
  p.cards.push(newCard);
  setter(newState);
};

export const AddToTable = (state, setter, newCard) => {
  const newState = [...state];
  newState.push(newCard);
  setter(newState);
};

export const InitialData = [
  { id: "0", d: [] },
  { id: "1", d: [] },
  { id: "2", d: [] },
  { id: "3", d: [] },
  { id: "common", d: [] },
];

export const INITIAL_STATE = (
  tableState,
  tableSetter,
  cardState,
  cardSetter,
  edgesState,
  edgesSetter,
  nodesState,
  nodesSetter,
  data,
  setData,
  props
) => {
  cardSetter([
    { id: "0", cards: [] },
    { id: "1", cards: [] },
    { id: "2", cards: [] },
    { id: "3", cards: [] },
  ]);
  tableSetter([]);
  edgesSetter(DirectedEdges);
  nodesSetter(Nodes);
};

export const PICK_RANDOM_NUMBER = (
  tableState,
  tableSetter,
  cardState,
  cardSetter,
  edgesState,
  edgesSetter,
  nodesState,
  nodesSetter,
  data,
  setData,
  props
) => {
  ChangeLabel(
    nodesState,
    nodesSetter,
    props.id,
    <div>
      <h4 style={SS.node_title}>
        {" "}
        {props.id === "0" ? "Me" : `Player ${props.id}`}
      </h4>
      <Latex strict>{`$c_${props.id} = ${props.number}$`}</Latex>
    </div>
  );
};

export const ENCRYPT_RANDOM_NUMBER = (
  tableState,
  tableSetter,
  cardState,
  cardSetter,
  edgesState,
  edgesSetter,
  nodesState,
  nodesSetter,
  data,
  setData,
  props
) => {
  ChangeLabel(
    nodesState,
    nodesSetter,
    props.id,
    <div>
      <h4 style={SS.node_title}>
        {" "}
        {props.id === "0" ? "Me" : `Player ${props.id}`}
      </h4>
      <Latex strict>{`$c_${props.id} = ${props.number}$`}</Latex>
      <br />
      <Latex strict>
        {`$E(c_${props.id}) = \
        (0x${props.result[0].toString(16)}..., \
        0x${props.result[1].toString(16)}...)$`}
      </Latex>
    </div>
  );
};

export const SHARE_ENCRYPTION = (
  tableState,
  tableSetter,
  cardState,
  cardSetter,
  edgesState,
  edgesSetter,
  nodesState,
  nodesSetter,
  data,
  setData,
  props
) => {
  const defaultEdges = [...edgesState];
  for (let i = 0; i < defaultEdges.length; i++) {
    defaultEdges[i].color = "gray";
  }
  edgesSetter(defaultEdges);

  const newEdges = [...edgesState];
  for (let i = 0; i < nodesState.length; i++) {
    if (i + "" === props.from) continue;
    let edge = GetEdge(newEdges, props.from, i + "");
    edge.color = "green";
  }
  edgesSetter(newEdges);

  const newData = [...data];
  const ourData = newData.filter((d) => d.id === props.from)[0];
  console.log(ourData);
  ourData.d.push(
    <Latex strict style={{ fontSize: "12px" }}>
      {`$E(c_${props.from}) = \
    (0x${props.encryption[0].toString(16)}..., \
    0x${props.encryption[1].toString(16)}...)$`}
    </Latex>
  );
  setData(newData);
};
