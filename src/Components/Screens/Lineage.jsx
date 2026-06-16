import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

const baseStyles = {
  padding: 12,
  borderRadius: 14,
  fontWeight: 700,
  cursor: "pointer",
  textAlign: "center",
  minWidth: 120,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
};

export default function Lineage() {
  const navigate = useNavigate();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Responsive screen tracking
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Responsive spacing
    const centerX = screenWidth / 2;

    // Better responsive spacing
    const spacing =
      screenWidth < 600
        ? 120
        : screenWidth < 900
        ? 180
        : 250;

    // Descendants
    const descendants = [
  {
    id: "agosi",
    label: "Agosi\n(No Issue)",
    color: "#eeeeee",
  },
  {
    id: "nwankwo",
    label: "Nwankwo",
    route: "/nwankwo",
    color: "#e3f2fd",
  },
  {
    id: "asouzu",
    label: "Asouzu",
    route: "/asouzu",
    color: "#f3e5f5",
  },
  {
    id: "udorji",
    label: "Udorji",
    route: "/udorji",
    color: "#e8f5e9",
  },
  {
    id: "okoli",
    label: "Okoli",
    route: "/okoli",
    color: "#fff3e0",
  },
  {
    id: "anyaga",
    label: "Anyaga\n(No Issue)",
    color: "#eeeeee",
  },
];
    // Dynamic horizontal alignment
    const startX =
      centerX - ((descendants.length - 1) * spacing) / 2;

    // Ancestor node
    const ancestorNode = {
      id: "nmelonye",
      position: {
        x: centerX - 70,
        y: 40,
      },
      data: {
        label: "Nmelonye\n(Ancestor)",
      },
      style: {
        ...baseStyles,
        background: "#004aad",
        color: "#fff",
        minWidth: 150,
        fontSize: "16px",
      },
    };

    // Descendant nodes
    const descendantNodes = descendants.map((desc, index) => ({
      id: desc.id,
      position: {
        x: startX + index * spacing,
        y: 260,
      },
      data: {
        label: desc.label,
      },
      style: {
  ...baseStyles,
  background: desc.color,
  color: "#111",
  opacity: desc.route ? 1 : 0.75,
  border: desc.route
    ? "2px solid transparent"
    : "2px dashed #999",
},
    }));

    // Edges
    const descendantEdges = descendants.map((desc) => ({
      id: `e-nmelonye-${desc.id}`,
      source: "nmelonye",
      target: desc.id,
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: {
        strokeWidth: 2.5,
        stroke: "#004aad",
      },
    }));

    setNodes([ancestorNode, ...descendantNodes]);
    setEdges(descendantEdges);
  }, [screenWidth, setNodes, setEdges]);

  // Navigation
  const onNodeClick = useCallback(
    (_, node) => {
      const routes = {
  nwankwo: "/nwankwo",
  asouzu: "/asouzu",
  udorji: "/udorji",
  okoli: "/okoli",
  // agosi: "/agosi",
  // anyaga: "/anyaga",
};

const route = routes[node.id];

if (route) {
  navigate(route);
}
    },
    [navigate]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#f4f7fb",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{
          padding: 0.3,
        }}
        panOnDrag
        zoomOnScroll
        nodesDraggable={false}
      >
        <MiniMap zoomable pannable />
        <Controls />
        <Background gap={18} size={1} />
      </ReactFlow>
    </div>
  );
}