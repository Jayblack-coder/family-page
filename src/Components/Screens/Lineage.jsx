import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  // Ancestor
  {
    id: "nmelonye",
    position: { x: 500, y: 0 },
    data: { label: "Nmelonye (Ancestor)" },
    style: ancestorStyle,
  },

  // First Generation
  { id: "agosi", position: { x: 0, y: 150 }, data: { label: "Agosi" }, style: gen1Style },
  { id: "nwankwo", position: { x: 200, y: 150 }, data: { label: "Nwankwo" }, style: gen1Style },
  { id: "asouzu", position: { x: 400, y: 150 }, data: { label: "Asouzu" }, style: gen1Style },
  { id: "udorji", position: { x: 600, y: 150 }, data: { label: "Udorji" }, style: gen1Style },
  { id: "okoli", position: { x: 800, y: 150 }, data: { label: "Okoli" }, style: gen1Style },
  { id: "anyaga", position: { x: 1000, y: 150 }, data: { label: "Anyaga" }, style: gen1Style },

  // Second / Third Generation (spaced vertically)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `nwankwo-${i}`,
    position: { x: 200, y: 300 + i * 80 },
    data: { label: `Nwankwo Child ${i + 1}` },
    style: gen2Style,
  })),

  ...Array.from({ length: 8 }, (_, i) => ({
    id: `asouzu-${i}`,
    position: { x: 400, y: 300 + i * 80 },
    data: { label: `Asouzu Child ${i + 1}` },
    style: gen2Style,
  })),

  ...Array.from({ length: 12 }, (_, i) => ({
    id: `udorji-${i}`,
    position: { x: 600, y: 300 + i * 70 },
    data: { label: `Udorji Child ${i + 1}` },
    style: gen2Style,
  })),

  ...Array.from({ length: 3 }, (_, i) => ({
    id: `okoli-${i}`,
    position: { x: 800, y: 300 + i * 90 },
    data: { label: `Okoli Child ${i + 1}` },
    style: gen2Style,
  })),

  ...Array.from({ length: 2 }, (_, i) => ({
    id: `anyaga-${i}`,
    position: { x: 1000, y: 300 + i * 120 },
    data: { label: `Anyaga Child ${i + 1}` },
    style: gen2Style,
  })),
];

const initialEdges = [
  // Ancestor to first generation
  ...["agosi", "nwankwo", "asouzu", "udorji", "okoli", "anyaga"].map((id) => ({
    id: `e-nmelonye-${id}`,
    source: "nmelonye",
    target: id,
  })),

  // Parents to children
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `e-nwankwo-${i}`,
    source: "nwankwo",
    target: `nwankwo-${i}`,
  })),

  ...Array.from({ length: 8 }, (_, i) => ({
    id: `e-asouzu-${i}`,
    source: "asouzu",
    target: `asouzu-${i}`,
  })),

  ...Array.from({ length: 12 }, (_, i) => ({
    id: `e-udorji-${i}`,
    source: "udorji",
    target: `udorji-${i}`,
  })),

  ...Array.from({ length: 3 }, (_, i) => ({
    id: `e-okoli-${i}`,
    source: "okoli",
    target: `okoli-${i}`,
  })),

  ...Array.from({ length: 2 }, (_, i) => ({
    id: `e-anyaga-${i}`,
    source: "anyaga",
    target: `anyaga-${i}`,
  })),
];

// Styles
const ancestorStyle = {
  padding: 12,
  borderRadius: 12,
  background: "#004aad",
  color: "#fff",
  fontWeight: "bold",
};

const gen1Style = {
  padding: 10,
  borderRadius: 10,
  background: "#e3f2fd",
  border: "2px solid #1976d2",
};

const gen2Style = {
  padding: 8,
  borderRadius: 8,
  background: "#f1f8e9",
  border: "1px solid #689f38",
};

export default function Lineage() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_, node) => {
    alert(`Clicked: ${node.data.label}`);
  }, []);

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        panOnScroll
        zoomOnScroll
      >
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}
