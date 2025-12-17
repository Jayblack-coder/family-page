// import React, { useCallback } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
// } from "reactflow";
// import "reactflow/dist/style.css";

// /* =======================
//    NODE STYLES (DEFINE FIRST)
// ======================= */
// const ancestorStyle = {
//   padding: 14,
//   borderRadius: 14,
//   background: "#004aad",
//   color: "#fff",
//   fontWeight: "bold",
//   fontSize: 16,
// };

// const gen1Style = {
//   padding: 12,
//   borderRadius: 12,
//   background: "#e3f2fd",
//   border: "2px solid #1976d2",
//   fontWeight: 600,
// };

// const gen2Style = {
//   padding: 10,
//   borderRadius: 10,
//   background: "#f1f8e9",
//   border: "1px solid #689f38",
//   fontSize: 13,
// };

// /* =======================
//    NODES
// ======================= */
// const initialNodes = [
//   // Ancestor
//   {
//     id: "nmelonye",
//     position: { x: 600, y: 0 },
//     data: { label: "Nmelonye (Ancestor)" },
//     style: ancestorStyle,
//   },

//   // First Generation
//   { id: "agosi", position: { x: 0, y: 150 }, data: { label: "Agosi" }, style: gen1Style },
//   { id: "nwankwo", position: { x: 200, y: 150 }, data: { label: "Nwankwo" }, style: gen1Style },
//   { id: "asouzu", position: { x: 400, y: 150 }, data: { label: "Asouzu" }, style: gen1Style },
//   { id: "udorji", position: { x: 600, y: 150 }, data: { label: "Udorji" }, style: gen1Style },
//   { id: "okoli", position: { x: 800, y: 150 }, data: { label: "Okoli" }, style: gen1Style },
//   { id: "anyaga", position: { x: 1000, y: 150 }, data: { label: "Anyaga" }, style: gen1Style },

//   // Second / Third Generation (extra spacing)
//   ...Array.from({ length: 6 }, (_, i) => ({
//     id: `nwankwo-${i}`,
//     position: { x: 200, y: 300 + i * 100 },
//     data: { label: `Nwankwo Child ${i + 1}` },
//     style: gen2Style,
//   })),

//   ...Array.from({ length: 8 }, (_, i) => ({
//     id: `asouzu-${i}`,
//     position: { x: 400, y: 300 + i * 100 },
//     data: { label: `Asouzu Child ${i + 1}` },
//     style: gen2Style,
//   })),

//   ...Array.from({ length: 12 }, (_, i) => ({
//     id: `udorji-${i}`,
//     position: { x: 600, y: 300 + i * 90 },
//     data: { label: `Udorji Child ${i + 1}` },
//     style: gen2Style,
//   })),

//   ...Array.from({ length: 3 }, (_, i) => ({
//     id: `okoli-${i}`,
//     position: { x: 800, y: 300 + i * 120 },
//     data: { label: `Okoli Child ${i + 1}` },
//     style: gen2Style,
//   })),

//   ...Array.from({ length: 2 }, (_, i) => ({
//     id: `anyaga-${i}`,
//     position: { x: 1000, y: 300 + i * 140 },
//     data: { label: `Anyaga Child ${i + 1}` },
//     style: gen2Style,
//   })),
// ];

// /* =======================
//    EDGES
// ======================= */
// const initialEdges = [
//   ...["agosi", "nwankwo", "asouzu", "udorji", "okoli", "anyaga"].map((id) => ({
//     id: `e-nmelonye-${id}`,
//     source: "nmelonye",
//     target: id,
//     animated: true,
//   })),

//   ...Array.from({ length: 6 }, (_, i) => ({
//     id: `e-nwankwo-${i}`,
//     source: "nwankwo",
//     target: `nwankwo-${i}`,
//   })),

//   ...Array.from({ length: 8 }, (_, i) => ({
//     id: `e-asouzu-${i}`,
//     source: "asouzu",
//     target: `asouzu-${i}`,
//   })),

//   ...Array.from({ length: 12 }, (_, i) => ({
//     id: `e-udorji-${i}`,
//     source: "udorji",
//     target: `udorji-${i}`,
//   })),

//   ...Array.from({ length: 3 }, (_, i) => ({
//     id: `e-okoli-${i}`,
//     source: "okoli",
//     target: `okoli-${i}`,
//   })),

//   ...Array.from({ length: 2 }, (_, i) => ({
//     id: `e-anyaga-${i}`,
//     source: "anyaga",
//     target: `anyaga-${i}`,
//   })),
// ];

// /* =======================
//    COMPONENT
// ======================= */
// export default function Lineage() {
//   const [nodes, , onNodesChange] = useNodesState(initialNodes);
//   const [edges, , onEdgesChange] = useEdgesState(initialEdges);

//   const onNodeClick = useCallback((_, node) => {
//     alert(node.data.label);
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "90vh" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onNodeClick={onNodeClick}
//         fitView
//         panOnScroll
//         zoomOnScroll
//         nodesDraggable
//       >
//         <MiniMap zoomable pannable />
//         <Controls />
//         <Background gap={18} />
//       </ReactFlow>
//     </div>
//   );
// }

import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { fetchLineageStats } from "..Screens/lineageApi";

const baseStyles = {
  padding: 10,
  borderRadius: 12,
  fontWeight: 600,
  cursor: "pointer",
};

export default function Lineage() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const load = async () => {
      const stats = await fetchLineageStats();

      const newNodes = [
        {
          id: "nmelonye",
          position: { x: 500, y: 0 },
          data: { label: "Nmelonye (Ancestor)" },
          style: {
            ...baseStyles,
            background: "#004aad",
            color: "#fff",
          },
        },

        {
          id: "nwankwo",
          position: { x: 100, y: 150 },
          data: { label: `Nwankwo (${stats.nwankwo})` },
          style: { ...baseStyles, background: "#e3f2fd" },
        },
        {
          id: "asouzu",
          position: { x: 300, y: 150 },
          data: { label: `Asouzu (${stats.asouzu})` },
          style: { ...baseStyles, background: "#e3f2fd" },
        },
        {
          id: "udorji",
          position: { x: 500, y: 150 },
          data: { label: `Udorji (${stats.udorji})` },
          style: { ...baseStyles, background: "#e3f2fd" },
        },
        {
          id: "okoli",
          position: { x: 700, y: 150 },
          data: { label: `Okoli (${stats.okoli})` },
          style: { ...baseStyles, background: "#e3f2fd" },
        },
        {
          id: "anyaga",
          position: { x: 900, y: 150 },
          data: { label: `Anyaga (${stats.anyaga})` },
          style: { ...baseStyles, background: "#e3f2fd" },
        },
      ];

      const newEdges = newNodes
        .filter((n) => n.id !== "nmelonye")
        .map((n) => ({
          id: `e-nmelonye-${n.id}`,
          source: "nmelonye",
          target: n.id,
        }));

      setNodes(newNodes);
      setEdges(newEdges);
    };

    load();
  }, [setNodes, setEdges]);

  const onNodeClick = useCallback((_, node) => {
    if (node.id !== "nmelonye") {
      navigate(`/${node.id}`);
    }
  }, [navigate]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
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
