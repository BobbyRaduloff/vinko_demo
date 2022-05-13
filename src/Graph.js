import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { Store } from "pullstate";

const SS = {
  node_title: {
    marginBottom: 0,
    marginTop: 0,
  },
};

export const STORE = new Store({
  directedEdges: [
    { a: 0, b: 1, color: "gray" },
    { a: 0, b: 2, color: "gray" },
    { a: 0, b: 3, color: "gray" },
    { a: 1, b: 2, color: "gray" },
    { a: 1, b: 3, color: "gray" },
    { a: 2, b: 3, color: "gray" },
  ],
  cards: [[], [], [], []],
  table: [],
  nodes: [
    {
      id: 0,
      label: undefined,
      title: "Me",
      position: { x: 75, y: 25 },
      sourcePosition: "bottom",
      targetPosition: "bottom",
      color: undefined,
    },
    {
      id: 1,
      label: undefined,
      title: "Player 1",
      position: { x: 905, y: 25 },
      targetPosition: "bottom",
      sourcePosition: "bottom",
      color: undefined,
    },
    {
      id: 2,
      label: undefined,
      title: "Player 2",
      position: { x: 75, y: 400 },
      targetPosition: "top",
      sourcePosition: "top",
      color: undefined,
    },
    {
      id: "3",
      label: undefined,
      title: "Player 3",
      position: { x: 905, y: 400 },
      targetPosition: "top",
      sourcePosition: "top",
      color: undefined,
    },
  ],
  commitments: [
    { value: undefined, valid: false, revealed: false },
    { value: undefined, valid: false, revealed: false },
    { value: undefined, valid: false, revealed: false },
    { value: undefined, valid: false, revealed: false },
  ],
  encryptions: [
    { value: undefined, valid: false, revealed: false },
    { value: undefined, valid: false, revealed: false },
    { value: undefined, valid: false, revealed: false },
    { value: undefined, valid: false, revealed: false },
  ],
  randomness: [
    { value: undefined, revealed: false, otherRands: [] },
    { value: undefined, revealed: false, otherRands: [] },
    { value: undefined, revealed: false, otherRands: [] },
    { value: undefined, revealed: false, otherRands: [] },
  ],
  finalEncryption: { value: undefined, valid: false },
  finalCard: { value: undefined, valid: false },
});

const DirectedEdgeToFlowEdge = (edge) => {
  return {
    id: `e${edge.a}-${edge.b}`,
    source: edge.a + "",
    target: edge.b + "",
    animated: edge.color === "green" || edge.color === "red",
    style: {
      stroke: edge.color,
      strokeWidth: "4px",
    },
  };
};

export const GetEdge = (from, to) => {
  const state = STORE.useState((s) => s.directedEdges);
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

export const GenerateEdges = () => {
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ];

  return edges.map((ea) => DirectedEdgeToFlowEdge(GetEdge(...ea)));
};

export const SetEdgeColor = (from, to, color) => {
  STORE.update((s) => {
    const atob = s.directedEdges.filter(
      (edge) => edge.a === from && edge.b === to
    );
    if (atob.length > 0) {
      atob[0].color = color;
      return;
    }

    const btoa = s.directedEdges.filter(
      (edge) => edge.b === from && edge.a === to
    );
    if (btoa.length > 0) {
      btoa[0].color = color;
      return;
    }
  });
};

export const SetDefaultEdges = () => {
  STORE.update((s) => {
    s.directedEdges.forEach((e) => (e.color = "gray"));
  });
};

export const SendToAll = (from) => {
  SetDefaultEdges();
  STORE.update((s) => {
    s.directedEdges
      .filter((e) => e.id !== from)
      .filter((e) => e.a === from || e.b === from)
      .forEach((e) => (e.color = "green"));
  });
};

export const GenerateNodes = () => {
  const state = STORE.useState((s) => s.nodes);
  const randomness = STORE.useState((s) => s.randomness);
  const encryptions = STORE.useState((s) => s.encryptions);
  const commitments = STORE.useState((s) => s.commitments);
  const nodes = [];
  for (const n of state) {
    nodes.push({
      id: n.id + "",
      data: {
        label: (
          <>
            {<h4 style={{ marginTop: 0, marginBottom: 0 }}>{n.title}</h4>}
            {(() => {
              if (randomness[n.id].value) {
                let ret;
                if (randomness[n.id].revealed || n.id === 0) {
                  ret = (
                    <Latex strict>{`$c_${n.id} = ${
                      randomness[n.id].value
                    }$`}</Latex>
                  );
                } else {
                  ret = <Latex strict>{`$c_${n.id} = ?$`}</Latex>;
                }
                return (
                  <>
                    {ret}
                    {randomness[n.id].otherRands !== [] ? (
                      randomness[n.id].otherRands.map((x) => {
                        if (n.id === 0) {
                          return (
                            <>
                              <br />
                              <Latex strict>
                                {`$c_${x.index} = ${x.value}$`}
                              </Latex>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <br />
                              <Latex strict>
                                {`$c_${x.index} = ${
                                  x.index == 0 ? x.value : "?"
                                }$`}
                              </Latex>
                            </>
                          );
                        }
                      })
                    ) : (
                      <></>
                    )}
                    <br />
                  </>
                );
              }
            })()}
            {(() => {
              if (encryptions[n.id].value) {
                let ret;
                if (encryptions[n.id].revealed || n.id === 0) {
                  ret = (
                    <Latex strict>{`$E(c_${n.id}) = \
                  (0x${encryptions[n.id].value[0].toString(16)}..., \
                   0x${encryptions[n.id].value[1].toString(16)}...)$`}</Latex>
                  );
                } else {
                  ret = <Latex strict>{`$E(c_${n.id}) = ?$`}</Latex>;
                }
                return (
                  <>
                    {ret}
                    <br />
                  </>
                );
              }
            })()}
            {(() => {
              if (commitments[n.id].value) {
                let ret;
                if (commitments[n.id].revealed || n.id === 0) {
                  ret = (
                    <Latex strict>{`$C(E(c_${n.id})) = 0x${commitments[
                      n.id
                    ].value.toString(16)}...$`}</Latex>
                  );
                } else {
                  ret = <Latex strict>{`$C(E(c_${n.id})) = ?$`}</Latex>;
                }
                return (
                  <>
                    {ret}
                    <br />
                  </>
                );
              }
            })()}
          </>
        ),
      },
      position: n.position,
      targetPosition: n.targetPosition,
      sourcePosition: n.sourcePosition,
      style: {
        width: "250px",
        background: n.color !== undefined ? n.color : "white",
      },
    });
  }
  return nodes;
};

export const GetCards = (id) => {
  return STORE.useState((s) => s.cards.filter((cc) => cc.id === id)[0]);
};

export const GetNode = (id) => {
  return STORE.useState((s) => s.nodes.filter((n) => n.id === id));
};

export const AddCard = (id, newCard) => {
  STORE.update((s) => {
    s.cards.filter((pp) => pp.id === id)[0].push(newCard);
  });
};

export const AddToTable = (newCard) => {
  STORE.update((s) => {
    s.table.push(newCard);
  });
};

export const PICK_RANDOM_NUMBER = (props) => {
  STORE.update((s) => {
    s.randomness[props.id].value = props.number;
  });
};

export const ENCRYPT_RANDOM_NUMBER = (props) => {
  STORE.update((s) => {
    s.encryptions[props.id].value = props.result;
  });
};

export const SHARE_COMMITMENT = (props) => {
  SendToAll(props.id);

  STORE.update((s) => {
    s.commitments[props.id].value = props.commitment;
    s.commitments[props.id].revealed = true;
  });
};

export const SHARE_ENCRYPTION = (props) => {
  SendToAll(props.id);

  STORE.update((s) => {
    s.encryptions[props.id].revealed = true;
  });
};

export const VERIFY_COMMITMENT = (props) => {
  SetDefaultEdges();

  STORE.update((s) => {
    s.commitments[props.id].valid = true;
  });

  STORE.update((s) => {
    s.nodes
      .filter((n) => s.commitments[n.id].valid)
      .forEach((n) => (n.color = "#00aa00"));
  });
};

export const SUM_ENCRYPTION = (props) => {
  SetDefaultEdges();
  STORE.update((s) => {
    s.nodes.forEach((s) => (s.color = undefined));
    s.finalEncryption.value = props.sum;
  });
};

export const REVEAL_RANDOMNESS = (props) => {
  SendToAll(props.id);

  STORE.update((s) => {
    s.randomness[props.id].revealed = true;
  });
};

export const SUM_RANDOMNESS = (props) => {
  SetDefaultEdges();
  STORE.update((s) => {
    s.finalCard.value = props.sum;
  });
};

export const VERIFY_ENCRYPTION = (props) => {
  SetDefaultEdges();
  STORE.update((s) => {
    s.encryptions[props.id].valid = true;
  });
};

export const VERIFY_FINAL_ENCRYPTION = (props) => {
  SetDefaultEdges();
  STORE.update((s) => {
    s.finalEncryption.valid = true;
  });
};

export const VERIFY_SUM = (props) => {
  SetDefaultEdges();
  STORE.update((s) => {
    s.finalCard.valid = true;
    s.table.push(s.finalCard.value);
  });
};

export const CLEAR = (props) => {
  SetDefaultEdges();
  STORE.update((s) => {
    s.nodes = s.nodes.map((n) => {
      n.label = undefined;
      n.color = undefined;

      return n;
    });
    s.commitments = s.commitments.map(
      (c) => (c = { value: undefined, valid: false, revealed: false })
    );
    s.encryptions = s.encryptions.map(
      (e) => (e = { value: undefined, valid: false, revealed: false })
    );
    s.randomness = s.randomness.map(
      (r) =>
        (r = {
          value: undefined,
          valid: false,
          revealed: false,
          otherRands: [],
        })
    );
    s.finalCard = { value: undefined, valid: false };
    s.finalEncryption = { value: undefined, valid: false };
  });
};

export const GIVE_RAND_TO = (props) => {
  SetDefaultEdges();
  STORE.update((s) => {
    let edge = s.directedEdges.filter(
      (e) =>
        (e.a === props.from && e.b === props.to) ||
        (e.a === props.to && e.b === props.from)
    )[0];

    edge.color = "green";
    s.randomness[props.to].otherRands.push({
      index: props.from,
      value: s.randomness[props.from].value,
    });
  });
};

export const SUM_PERSONAL_RAND = (props) => {
  SetDefaultEdges();
  STORE.update((s) => {
    s.cards[0].push(props.sum);
  });
};

export const SUM_OTHER_RAND = (props) => {
  SetDefaultEdges();
  STORE.update((s) => {
    s.cards[props.id].push(-1);
  });
};
