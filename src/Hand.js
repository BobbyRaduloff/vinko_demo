export const Hand = ({ cards, ...props }) => {
  const widths = { 0: 120, 1: 60, 2: 120, 3: 180, 4: 240, 5: 300 };
  const width = widths[cards.length];

  return (
    <svg width={width} height="100px" xmlns="http://www.w3.org/2000/svg">
      {cards.map((x, i) => {
        const href =
          x.rank !== "back"
            ? `svg-cards.svg#${x.suit}_${x.rank}`
            : `svg-cards.svg#back`;
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
