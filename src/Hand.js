export const Hand = ({ cards, ...props }) => {
  const widths = { 0: 120, 1: 60, 2: 120, 3: 180, 4: 240, 5: 300 };
  const width = widths[cards.length];

  return (
    <svg width={width} height="100px" xmlns="http://www.w3.org/2000/svg">
      {cards.map((x, i) => {
        let suit = ["club", "diamond", "heart", "spade"][Math.floor(x / 13)];
        let rank = (x % 13) + 1;
        if (rank === 11) rank = "jack";
        if (rank === 12) rank = "queen";
        if (rank === 13) rank = "king";
        console.log(Math.floor(x / 13), suit, rank);
        const href =
          x !== -1 ? `svg-cards.svg#${suit}_${rank}` : `svg-cards.svg#back`;
        return (
          <use
            href={href}
            transform="scale(0.3, 0.3)"
            fill="red"
            x={`${i * 200}px`}
          />
        );
      })}
    </svg>
  );
};
