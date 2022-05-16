import "./App.css";
import { Hand } from "./Hand";
import ReactFlow from "react-flow-renderer";
import { useState } from "react";
import "katex/dist/katex.min.css";
import {
  ENCRYPT_RANDOM_NUMBER,
  GenerateEdges,
  GenerateNodes,
  PICK_RANDOM_NUMBER,
  SHARE_COMMITMENT,
  SHARE_ENCRYPTION,
  VERIFY_COMMITMENT,
  STORE,
  SUM_ENCRYPTION,
  REVEAL_RANDOMNESS,
  SUM_RANDOMNESS,
  VERIFY_ENCRYPTION,
  VERIFY_FINAL_ENCRYPTION,
  VERIFY_SUM,
  CLEAR,
  GIVE_ENCRYPTION_TO,
  GIVE_RAND_TO,
  SUM_PERSONAL_RAND,
  SUM_OTHER_RAND,
} from "./Graph";
import Latex from "react-latex-next";
import { PickRandomNumber } from "./Crypto";

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
  // FLOP 1
  { f: PICK_RANDOM_NUMBER, props: { id: 0, number: PickRandomNumber() } },
  { f: PICK_RANDOM_NUMBER, props: { id: 1, number: 31 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 2, number: 10 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 3, number: 11 } },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 0, result: [0xffff, 0xbeef] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 1, result: [0xabab, 0xbaba] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 2, result: [0x1234, 0xdeed] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 3, result: [0x0231, 0x2322] },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 0, commitment: 0xaabb },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 1, commitment: 0xffcc },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 2, commitment: 0x11dd },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 3, commitment: 0x3f3f },
  },
  { f: SHARE_ENCRYPTION, props: { id: 0 } },
  { f: SHARE_ENCRYPTION, props: { id: 1 } },
  { f: SHARE_ENCRYPTION, props: { id: 2 } },
  { f: SHARE_ENCRYPTION, props: { id: 3 } },
  { f: VERIFY_COMMITMENT, props: { id: 0 } },
  { f: VERIFY_COMMITMENT, props: { id: 1 } },
  { f: VERIFY_COMMITMENT, props: { id: 2 } },
  { f: VERIFY_COMMITMENT, props: { id: 3 } },
  { f: SUM_ENCRYPTION, props: { sum: 0xbfaf } },
  { f: REVEAL_RANDOMNESS, props: { id: 0 } },
  { f: REVEAL_RANDOMNESS, props: { id: 1 } },
  { f: REVEAL_RANDOMNESS, props: { id: 2 } },
  { f: REVEAL_RANDOMNESS, props: { id: 3 } },
  { f: SUM_RANDOMNESS, props: { sum: 20 } },
  { f: VERIFY_ENCRYPTION, props: { id: 0 } },
  { f: VERIFY_ENCRYPTION, props: { id: 1 } },
  { f: VERIFY_ENCRYPTION, props: { id: 2 } },
  { f: VERIFY_ENCRYPTION, props: { id: 3 } },
  { f: VERIFY_FINAL_ENCRYPTION, props: {} },
  { f: VERIFY_SUM, props: {} },
  { f: CLEAR, props: {} },
  // FLOP 2
  { f: PICK_RANDOM_NUMBER, props: { id: 0, number: 0 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 1, number: 15 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 2, number: 12 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 3, number: 51 } },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 0, result: [0xffff, 0xbeef] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 1, result: [0xabab, 0xbaba] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 2, result: [0x1234, 0xdeed] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 3, result: [0x0231, 0x2322] },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 0, commitment: 0xaabb },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 1, commitment: 0xffcc },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 2, commitment: 0x11dd },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 3, commitment: 0x3f3f },
  },
  { f: SHARE_ENCRYPTION, props: { id: 0 } },
  { f: SHARE_ENCRYPTION, props: { id: 1 } },
  { f: SHARE_ENCRYPTION, props: { id: 2 } },
  { f: SHARE_ENCRYPTION, props: { id: 3 } },
  { f: VERIFY_COMMITMENT, props: { id: 0 } },
  { f: VERIFY_COMMITMENT, props: { id: 1 } },
  { f: VERIFY_COMMITMENT, props: { id: 2 } },
  { f: VERIFY_COMMITMENT, props: { id: 3 } },
  { f: SUM_ENCRYPTION, props: { sum: 0xbfaf } },
  { f: REVEAL_RANDOMNESS, props: { id: 0 } },
  { f: REVEAL_RANDOMNESS, props: { id: 1 } },
  { f: REVEAL_RANDOMNESS, props: { id: 2 } },
  { f: REVEAL_RANDOMNESS, props: { id: 3 } },
  { f: SUM_RANDOMNESS, props: { sum: 26 } },
  { f: VERIFY_ENCRYPTION, props: { id: 0 } },
  { f: VERIFY_ENCRYPTION, props: { id: 1 } },
  { f: VERIFY_ENCRYPTION, props: { id: 2 } },
  { f: VERIFY_ENCRYPTION, props: { id: 3 } },
  { f: VERIFY_FINAL_ENCRYPTION, props: {} },
  { f: VERIFY_SUM, props: {} },
  { f: CLEAR, props: {} },
  // FLOP 3
  { f: PICK_RANDOM_NUMBER, props: { id: 0, number: 44 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 1, number: 15 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 2, number: 10 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 3, number: 51 } },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 0, result: [0xffff, 0xbeef] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 1, result: [0xabab, 0xbaba] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 2, result: [0x1234, 0xdeed] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 3, result: [0x0231, 0x2322] },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 0, commitment: 0xaabb },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 1, commitment: 0xffcc },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 2, commitment: 0x11dd },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 3, commitment: 0x3f3f },
  },
  { f: SHARE_ENCRYPTION, props: { id: 0 } },
  { f: SHARE_ENCRYPTION, props: { id: 1 } },
  { f: SHARE_ENCRYPTION, props: { id: 2 } },
  { f: SHARE_ENCRYPTION, props: { id: 3 } },
  { f: VERIFY_COMMITMENT, props: { id: 0 } },
  { f: VERIFY_COMMITMENT, props: { id: 1 } },
  { f: VERIFY_COMMITMENT, props: { id: 2 } },
  { f: VERIFY_COMMITMENT, props: { id: 3 } },
  { f: SUM_ENCRYPTION, props: { sum: 0xbfaf } },
  { f: REVEAL_RANDOMNESS, props: { id: 0 } },
  { f: REVEAL_RANDOMNESS, props: { id: 1 } },
  { f: REVEAL_RANDOMNESS, props: { id: 2 } },
  { f: REVEAL_RANDOMNESS, props: { id: 3 } },
  { f: SUM_RANDOMNESS, props: { sum: 16 } },
  { f: VERIFY_ENCRYPTION, props: { id: 0 } },
  { f: VERIFY_ENCRYPTION, props: { id: 1 } },
  { f: VERIFY_ENCRYPTION, props: { id: 2 } },
  { f: VERIFY_ENCRYPTION, props: { id: 3 } },
  { f: VERIFY_FINAL_ENCRYPTION, props: {} },
  { f: VERIFY_SUM, props: {} },
  { f: CLEAR, props: {} },
  // ME 1
  { f: PICK_RANDOM_NUMBER, props: { id: 0, number: 1 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 1, number: 5 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 2, number: 12 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 3, number: 51 } },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 0, result: [0xffff, 0xbeef] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 1, result: [0xabab, 0xbaba] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 2, result: [0x1234, 0xdeed] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 3, result: [0x0231, 0x2322] },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 0, commitment: 0xaabb },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 1, commitment: 0xffcc },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 2, commitment: 0x11dd },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 3, commitment: 0x3f3f },
  },
  { f: SHARE_ENCRYPTION, props: { id: 0 } },
  { f: SHARE_ENCRYPTION, props: { id: 1 } },
  { f: SHARE_ENCRYPTION, props: { id: 2 } },
  { f: SHARE_ENCRYPTION, props: { id: 3 } },
  { f: VERIFY_COMMITMENT, props: { id: 0 } },
  { f: VERIFY_COMMITMENT, props: { id: 1 } },
  { f: VERIFY_COMMITMENT, props: { id: 2 } },
  { f: VERIFY_COMMITMENT, props: { id: 3 } },
  {
    f: GIVE_RAND_TO,
    props: { from: 1, to: 0 },
  },
  {
    f: GIVE_RAND_TO,
    props: { from: 2, to: 0 },
  },
  {
    f: GIVE_RAND_TO,
    props: { from: 3, to: 0 },
  },
  { f: SUM_PERSONAL_RAND, props: { sum: 17 } },
  { f: CLEAR, props: {} },
  // ME 2
  { f: PICK_RANDOM_NUMBER, props: { id: 0, number: 17 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 1, number: 2 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 2, number: 14 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 3, number: 33 } },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 0, result: [0xffff, 0xbeef] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 1, result: [0xabab, 0xbaba] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 2, result: [0x1234, 0xdeed] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 3, result: [0x0231, 0x2322] },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 0, commitment: 0xaabb },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 1, commitment: 0xffcc },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 2, commitment: 0x11dd },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 3, commitment: 0x3f3f },
  },
  { f: SHARE_ENCRYPTION, props: { id: 0 } },
  { f: SHARE_ENCRYPTION, props: { id: 1 } },
  { f: SHARE_ENCRYPTION, props: { id: 2 } },
  { f: SHARE_ENCRYPTION, props: { id: 3 } },
  { f: VERIFY_COMMITMENT, props: { id: 0 } },
  { f: VERIFY_COMMITMENT, props: { id: 1 } },
  { f: VERIFY_COMMITMENT, props: { id: 2 } },
  { f: VERIFY_COMMITMENT, props: { id: 3 } },
  {
    f: GIVE_RAND_TO,
    props: { from: 1, to: 0 },
  },
  {
    f: GIVE_RAND_TO,
    props: { from: 2, to: 0 },
  },
  {
    f: GIVE_RAND_TO,
    props: { from: 3, to: 0 },
  },
  { f: SUM_PERSONAL_RAND, props: { sum: 14 } },
  { f: CLEAR, props: {} },
  // Player 1
  { f: PICK_RANDOM_NUMBER, props: { id: 0, number: 22 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 1, number: 23 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 2, number: 11 } },
  { f: PICK_RANDOM_NUMBER, props: { id: 3, number: 11 } },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 0, result: [0xffff, 0xbeef] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 1, result: [0xabab, 0xbaba] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 2, result: [0x1234, 0xdeed] },
  },
  {
    f: ENCRYPT_RANDOM_NUMBER,
    props: { id: 3, result: [0x0231, 0x2322] },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 0, commitment: 0xaabb },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 1, commitment: 0xffcc },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 2, commitment: 0x11dd },
  },
  {
    f: SHARE_COMMITMENT,
    props: { id: 3, commitment: 0x3f3f },
  },
  { f: SHARE_ENCRYPTION, props: { id: 0 } },
  { f: SHARE_ENCRYPTION, props: { id: 1 } },
  { f: SHARE_ENCRYPTION, props: { id: 2 } },
  { f: SHARE_ENCRYPTION, props: { id: 3 } },
  { f: VERIFY_COMMITMENT, props: { id: 0 } },
  { f: VERIFY_COMMITMENT, props: { id: 1 } },
  { f: VERIFY_COMMITMENT, props: { id: 2 } },
  { f: VERIFY_COMMITMENT, props: { id: 3 } },
  { f: GIVE_RAND_TO, props: { from: 0, to: 1 } },
  { f: GIVE_RAND_TO, props: { from: 2, to: 1 } },
  { f: GIVE_RAND_TO, props: { from: 3, to: 1 } },
  { f: SUM_OTHER_RAND, props: { id: 1 } },
  { f: CLEAR, props: {} },
];

const EXECUTE_STEP = (N, SN) => {
  STEPS[N].f(STEPS[N].props);
  SN(N + 1);
};

function App() {
  // state machine
  const [CURRENT_STEP, SET_CURRENT_STEP] = useState(0);
  const commitments = STORE.useState((s) => s.commitments);
  const encryptions = STORE.useState((s) => s.encryptions);
  const randomness = STORE.useState((s) => s.randomness);
  const finalEncryption = STORE.useState((s) => s.finalEncryption);
  const finalCard = STORE.useState((s) => s.finalCard);
  const table = STORE.useState((s) => s.table);
  const cards = STORE.useState((s) => s.cards);
  const tick = <span style={{ marginLeft: "4px" }}>✅</span>;

  console.log(STEPS.length);

  return (
    <div style={SS.mainWrapper}>
      <div style={SS.columnWrapper}>
        <div style={SS.column2}>
          <div style={SS.simulation}>
            <h3> Simulation </h3>
            <button
              onClick={() => {
                if (CURRENT_STEP >= STEPS.length) return;
                EXECUTE_STEP(CURRENT_STEP, SET_CURRENT_STEP);
              }}
              style={{ marginBottom: "32px" }}
            >
              Next
            </button>
            <div style={SS.flowWrapper}>
              <ReactFlow
                nodes={GenerateNodes()}
                edges={GenerateEdges()}
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
              {[...Array(4)].map((_, i) => {
                const header = i === 0 ? <h4> Me </h4> : <h4> Player {i}</h4>;
                return (
                  <div style={SS.publicCol}>
                    {header}
                    <div style={{ fontSize: "10px" }}>
                      {(() => {
                        if (commitments[i].value && commitments[i].revealed) {
                          return (
                            <>
                              {
                                <Latex strict>
                                  {`$C(E(c_${i}) = 0x${commitments[
                                    i
                                  ].value.toString(16)}...$`}
                                </Latex>
                              }
                              {commitments[i].valid ? tick : <></>}
                              <br />
                            </>
                          );
                        }
                      })()}
                      {(() => {
                        if (encryptions[i].value && encryptions[i].revealed) {
                          return (
                            <>
                              {
                                <Latex strict>
                                  {`$E(c_${i}) = \
                                (0x${encryptions[i].value[0].toString(16)}..., \
                                 0x${encryptions[i].value[1].toString(
                                   16
                                 )}...)$`}
                                </Latex>
                              }
                              {encryptions[i].valid ? tick : <></>}
                              <br />
                            </>
                          );
                        }
                      })()}
                      {(() => {
                        if (randomness[i].value && randomness[i].revealed) {
                          return (
                            <>
                              {
                                <Latex strict>
                                  {`$c_${i} = ${randomness[i].value}$`}
                                </Latex>
                              }
                              {randomness[i].valid ? tick : <></>}
                              <br />
                            </>
                          );
                        }
                      })()}
                    </div>
                  </div>
                );
              })}
              <div style={SS.publicCol2}>
                <h4> Common </h4>
                <div style={{ fontSize: "10px" }}>
                  {finalEncryption.value ? (
                    <>
                      <Latex strict>
                        {`$E(\\sum n) = 0x${finalEncryption.value}...$`}
                      </Latex>
                      {finalEncryption.valid ? tick : <></>}
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  {finalCard.value ? (
                    <>
                      <Latex strict>
                        {`$\\sum n \\mod 52 = ${finalCard.value}$`}
                      </Latex>
                      {finalCard.valid ? tick : <></>}
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={SS.column}>
          <h1>Result</h1>
          <h2> Table </h2>
          <Hand cards={table} />
          <h2> Me </h2>
          <Hand cards={cards[0]} />
          <div style={SS.PlayersWrapper}>
            {cards
              .filter((_, j) => j > 0)
              .map((x, i) => {
                return (
                  <div style={SS.column}>
                    <h3> Player {i + 1} </h3>
                    <Hand cards={x} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
