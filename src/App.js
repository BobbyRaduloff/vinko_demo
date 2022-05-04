import './App.css';
import Graph from "react-graph-vis";

const SS = {
  mainWrapper: {
    display: "flex",
    minWidth: "100vw",
    minHeight: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  columnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    minWidth: "100%"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  }
}

const PeerGraph = {
  nodes: [
    { id: 1, label: "Player Me" },
    { id: 2, label: "Player 1" },
    { id: 3, label: "Player 2" },
    { id: 4, label: "Player 3" },
    { id: 5, label: "Player 4" }
  ],
  edges: []
};

const Table = [
  { suit: "club", rank: "1" },
  { suit: "spade", rank: "3" },
  { suit: "heart", rank: "7" },
  { suit: "diamond", rank: "1" },
  { suit: "club", rank: "2" }
];

const Me = [
  { suit: "club", rank: "3" },
  { suit: "spade", rank: "4" },
];

const GraphOpts = {
  edges: { color: "#000000" },
  height: "300px",
  width: "300px"
};

function App() {
  for (var i = 1; i <= PeerGraph.nodes.length; i++) {
    for (var j = 1; j <= PeerGraph.nodes.length; j++) {
      if (i === j) continue;
      PeerGraph.edges.push({ to: i, from: j });
    }
  }

  return (
    <div style={SS.mainWrapper}>
      <div style={SS.columnWrapper}>
        <div style={SS.column}>
          <h1>Player Visualisation</h1>
          <h2> Table </h2>
          <svg width="300px" height="100px" xmlns="http://www.w3.org/2000/svg">
            {Table.map((x, i) => {
              return (<use href={`svg-cards.svg#${x.suit}_${x.rank}`} transform="scale(0.3, 0.3)" fill="red" x={`${i * 200}px`} />);
            })}
          </svg>
          <h2> Me </h2>
          <svg width="120px" height="100px" xmlns="http://www.w3.org/2000/svg">
            {Me.map((x, i) => {
              return (<use href={`svg-cards.svg#${x.suit}_${x.rank}`} transform="scale(0.3, 0.3)" fill="red" x={`${i * 200}px`} />);
            })}
            </svg>
        </div>
        <div style={SS.column}>
          <h1> Other Players </h1>
          {[...Array(PeerGraph.nodes.length - 1)].map((_, i) => {
            return (
              <div style={SS.column}>
                <h3> Player {i + 1}</h3>
                <svg width="120px" height="100px" xmlns="http://www.w3.org/2000/svg">
                  {[...Array(2)].map((_, i) => {
                    return (<use href={`svg-cards.svg#back`} transform="scale(0.3, 0.3)" fill="red" x={`${i * 200}px`} />);
                  })}
                </svg>
              </div>
            );
          })}
      </div>
      <div style={SS.column}>
        <h1>Network Visualisation</h1>
        <Graph graph={PeerGraph} options={GraphOpts} />
      </div>
    </div>
    </div >
  );
}

export default App;
