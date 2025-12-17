
// import React, { useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import { fetchLineageStats } from "..Screens/lineageApi";

// const baseStyles = {
//   padding: 10,
//   borderRadius: 12,
//   fontWeight: 600,
//   cursor: "pointer",
// };

// export default function Lineage() {
//   const navigate = useNavigate();
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   useEffect(() => {
//     const load = async () => {
//       const stats = await fetchLineageStats();

//       const newNodes = [
//         {
//           id: "nmelonye",
//           position: { x: 500, y: 0 },
//           data: { label: "Nmelonye (Ancestor)" },
//           style: {
//             ...baseStyles,
//             background: "#004aad",
//             color: "#fff",
//           },
//         },

//         {
//           id: "nwankwo",
//           position: { x: 100, y: 150 },
//           data: { label: `Nwankwo (${stats.nwankwo})` },
//           style: { ...baseStyles, background: "#e3f2fd" },
//         },
//         {
//           id: "asouzu",
//           position: { x: 300, y: 150 },
//           data: { label: `Asouzu (${stats.asouzu})` },
//           style: { ...baseStyles, background: "#e3f2fd" },
//         },
//         {
//           id: "udorji",
//           position: { x: 500, y: 150 },
//           data: { label: `Udorji (${stats.udorji})` },
//           style: { ...baseStyles, background: "#e3f2fd" },
//         },
//         {
//           id: "okoli",
//           position: { x: 700, y: 150 },
//           data: { label: `Okoli (${stats.okoli})` },
//           style: { ...baseStyles, background: "#e3f2fd" },
//         },
//         {
//           id: "anyaga",
//           position: { x: 900, y: 150 },
//           data: { label: `Anyaga (${stats.anyaga})` },
//           style: { ...baseStyles, background: "#e3f2fd" },
//         },
//       ];

//       const newEdges = newNodes
//         .filter((n) => n.id !== "nmelonye")
//         .map((n) => ({
//           id: `e-nmelonye-${n.id}`,
//           source: "nmelonye",
//           target: n.id,
//         }));

//       setNodes(newNodes);
//       setEdges(newEdges);
//     };

//     load();
//   }, [setNodes, setEdges]);

//   const onNodeClick = useCallback((_, node) => {
//     if (node.id !== "nmelonye") {
//       navigate(`/${node.id}`);
//     }
//   }, [navigate]);

//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onNodeClick={onNodeClick}
//         fitView
//         panOnScroll
//         zoomOnScroll
//       >
//         <MiniMap />
//         <Controls />
//         <Background gap={16} />
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
import API from "../Screens/api.jsx"; // your axios instance

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
    const loadFamily = async () => {
      try {
        const res = await API.get("/api/user");
        const family = res.data;

        const getChildren = (parentName) =>
          family.filter((member) => member.parents === parentName);

        const firstGen = [
          { id: "nwankwo", label: "Nwankwo", x: 100 },
          { id: "asouzu", label: "Asouzu", x: 300 },
          { id: "udorji", label: "Udorji", x: 500 },
          { id: "okoli", label: "Okoli", x: 700 },
          { id: "anyaga", label: "Anyaga", x: 900 },
        ];

        const newNodes = [
          {
            id: "nmelonye",
            position: { x: 500, y: 0 },
            data: { label: "Nmelonye (Ancestor)" },
            style: { ...baseStyles, background: "#004aad", color: "#fff" },
          },
          ...firstGen.map((f) => ({
            id: f.id,
            position: { x: f.x, y: 150 },
            data: { label: f.label },
            style: { ...baseStyles, background: "#e3f2fd" },
          })),
        ];

        const newEdges = firstGen.map((f) => ({
          id: `e-nmelonye-${f.id}`,
          source: "nmelonye",
          target: f.id,
        }));

        // Dynamically space children vertically based on count
        firstGen.forEach((parent) => {
          const children = getChildren(parent.label);
          if (children.length === 0) return;

          const startY = 300; // top Y for first child
          const spacing = Math.max(80, 600 / children.length); // adapt spacing to count
          const totalHeight = spacing * (children.length - 1);
          const offsetY = startY + totalHeight / -2 + totalHeight / 2; // center under parent

          children.forEach((child, i) => {
            newNodes.push({
              id: child._id,
              position: {
                x: parent.x,
                y: startY + i * spacing,
              },
              data: { label: child.firstName },
              style: { ...baseStyles, background: "#f1f8e9" },
            });
            newEdges.push({
              id: `e-${parent.id}-${child._id}`,
              source: parent.id,
              target: child._id,
            });
          });
        });

        setNodes(newNodes);
        setEdges(newEdges);
      } catch (err) {
        console.error("Error loading family:", err);
      }
    };

    loadFamily();
  }, [setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_, node) => {
      if (node.id !== "nmelonye") navigate(`/${node.id}`);
    },
    [navigate]
  );

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
        nodesDraggable
      >
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}
