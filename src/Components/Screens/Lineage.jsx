import React from "react";

const NODE_WIDTH = 140;
const NODE_HEIGHT = 45;

const Lineage = () => {
  // Tree data
  const tree = {
    name: "Nmelonye",
    generation: 0,
    children: [
      { name: "Agosi", generation: 1, children: [] },
      {
        name: "Nwankwo",
        generation: 1,
        children: Array.from({ length: 6 }, (_, i) => ({
          name: `Nwankwo Child ${i + 1}`,
          generation: 2,
        })),
      },
      {
        name: "Asouzu",
        generation: 1,
        children: Array.from({ length: 8 }, (_, i) => ({
          name: `Asouzu Child ${i + 1}`,
          generation: 2,
        })),
      },
      {
        name: "Udorji",
        generation: 1,
        children: Array.from({ length: 12 }, (_, i) => ({
          name: `Udorji Child ${i + 1}`,
          generation: 2,
        })),
      },
      {
        name: "Okoli",
        generation: 1,
        children: Array.from({ length: 3 }, (_, i) => ({
          name: `Okoli Child ${i + 1}`,
          generation: 2,
        })),
      },
      {
        name: "Anyaga",
        generation: 1,
        children: Array.from({ length: 2 }, (_, i) => ({
          name: `Anyaga Child ${i + 1}`,
          generation: 2,
        })),
      },
    ],
  };

  const handleNodeClick = (name) => {
    alert(`You clicked on ${name}`);
    // later: open modal or navigate to profile page
  };

  const renderNode = (x, y, label, key) => (
    <g
      key={key}
      onClick={() => handleNodeClick(label)}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={x}
        y={y}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={12}
        fill="#ffffff"
        stroke="#004aad"
        strokeWidth="2"
      />
      <text
        x={x + NODE_WIDTH / 2}
        y={y + NODE_HEIGHT / 2 + 5}
        textAnchor="middle"
        fontSize="14"
        fill="#333"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );

  const renderLine = (x1, y1, x2, y2, key) => (
    <line
      key={key}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#999"
      strokeWidth="2"
    />
  );

  let svgWidth = 1400;
  let svgHeight = 900;

  return (
    <div style={{ padding: 20, background: "#f5f6fa" }}>
      <h1 style={{ textAlign: "center", color: "#004aad" }}>
        Nmelonye Family Lineage
      </h1>

      <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Ancestor */}
        {renderNode(svgWidth / 2 - NODE_WIDTH / 2, 40, tree.name, "ancestor")}

        {/* First Generation */}
        {tree.children.map((child, i) => {
          const x =
            100 + i * ((svgWidth - 200) / tree.children.length);
          const y = 160;

          return (
            <g key={child.name}>
              {renderLine(
                svgWidth / 2,
                40 + NODE_HEIGHT,
                x + NODE_WIDTH / 2,
                y,
                `line-1-${i}`
              )}
              {renderNode(x, y, child.name, child.name)}

              {/* Second Generation */}
              {child.children?.map((grand, j) => {
                const gx =
                  x -
                  (child.children.length * 60) / 2 +
                  j * 60;
                const gy = 300;

                return (
                  <g key={grand.name}>
                    {renderLine(
                      x + NODE_WIDTH / 2,
                      y + NODE_HEIGHT,
                      gx + NODE_WIDTH / 2,
                      gy,
                      `line-2-${i}-${j}`
                    )}
                    {renderNode(gx, gy, grand.name, grand.name)}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Lineage;

