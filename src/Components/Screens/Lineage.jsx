
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
// import API from "../Screens/api.jsx"; // your axios instance

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
//     const loadFamily = async () => {
//       try {
//         const res = await API.get("/api/user");
//         const family = res.data;

//         const getChildren = (parentName) =>
//           family.filter((member) => member.parents === parentName);

//         const firstGen = [
//           { id: "nwankwo", label: "Nwankwo", x: 100 },
//           { id: "asouzu", label: "Asouzu", x: 300 },
//           { id: "udorji", label: "Udorji", x: 500 },
//           { id: "okoli", label: "Okoli", x: 700 },
//           { id: "anyaga", label: "Anyaga", x: 900 },
//         ];

//         const newNodes = [
//           {
//             id: "nmelonye",
//             position: { x: 500, y: 0 },
//             data: { label: "Nmelonye (Ancestor)" },
//             style: { ...baseStyles, background: "#004aad", color: "#fff" },
//           },
//           ...firstGen.map((f) => ({
//             id: f.id,
//             position: { x: f.x, y: 150 },
//             data: { label: f.label },
//             style: { ...baseStyles, background: "#e3f2fd" },
//           })),
//         ];

//         const newEdges = firstGen.map((f) => ({
//           id: `e-nmelonye-${f.id}`,
//           source: "nmelonye",
//           target: f.id,
//         }));

//         // Dynamically space children vertically based on count
//         firstGen.forEach((parent) => {
//           const children = getChildren(parent.label);
//           if (children.length === 0) return;

//           const startY = 300; // top Y for first child
//           const spacing = Math.max(80, 600 / children.length); // adapt spacing to count
//           const totalHeight = spacing * (children.length - 1);
//           const offsetY = startY + totalHeight / -2 + totalHeight / 2; // center under parent

//           children.forEach((child, i) => {
//             newNodes.push({
//               id: child._id,
//               position: {
//                 x: parent.x,
//                 y: startY + i * spacing,
//               },
//               data: { label: child.firstName },
//               style: { ...baseStyles, background: "#f1f8e9" },
//             });
//             newEdges.push({
//               id: `e-${parent.id}-${child._id}`,
//               source: parent.id,
//               target: child._id,
//             });
//           });
//         });

//         setNodes(newNodes);
//         setEdges(newEdges);
//       } catch (err) {
//         console.error("Error loading family:", err);
//       }
//     };

//     loadFamily();
//   }, [setNodes, setEdges]);

//   const onNodeClick = useCallback(
//     (_, node) => {
//       if (node.id !== "nmelonye") navigate(`/${node.id}`);
//     },
//     [navigate]
//   );

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
//         nodesDraggable
//       >
//         <MiniMap />
//         <Controls />
//         <Background gap={16} />
//       </ReactFlow>
//     </div>
//   );
// }

import React, { useEffect, useCallback, useState } from "react";
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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  const loadFamily = async () => {
    try {
      const res = await API.get("/api/user/family-line/nwankwo");
      const family = res.data;

      // Ancestor node
      const newNodes = [
        {
          id: "nmelonye",
          position: { x: screenWidth / 2, y: 0 },
          data: { label: "Nmelonye (Ancestor)" },
          style: { ...baseStyles, background: "#004aad", color: "#fff" },
        },
      ];

      // Nwankwo as first generation
      const nwankwoNode = {
        id: "nwankwo",
        position: { x: screenWidth / 2, y: 150 },
        data: { label: "Nwankwo" },
        style: { ...baseStyles, background: "#e3f2fd" },
      };
      newNodes.push(nwankwoNode);

      const newEdges = [{
        id: `e-nmelonye-nwankwo`,
        source: "nmelonye",
        target: "nwankwo",
      }];

      // Group Nwankwo family by generation
      const generations = {};
      family.forEach((member) => {
        const gen = member.generation;
        if (!generations[gen]) generations[gen] = [];
        generations[gen].push(member);
      });

      // Sort generations
      const genOrder = ["1st", "2nd", "3rd", "4th", "5th"];
      const sortedGens = genOrder.filter(gen => generations[gen]);

      // Add generation nodes and member nodes
      sortedGens.forEach((gen, genIndex) => {
        const genY = 300 + genIndex * 200;
        const genNodeId = `gen-${gen}`;
        
        // Add generation node
        newNodes.push({
          id: genNodeId,
          position: { x: screenWidth / 2, y: genY },
          data: { label: `Generation ${gen}` },
          style: { ...baseStyles, background: "#fff3e0" },
        });

        // Connect to Nwankwo or previous generation
        const sourceId = genIndex === 0 ? "nwankwo" : `gen-${sortedGens[genIndex - 1]}`;
        newEdges.push({
          id: `e-${sourceId}-${genNodeId}`,
          source: sourceId,
          target: genNodeId,
        });

        // Add member nodes for this generation
        const members = generations[gen];
        const spacingX = Math.max(150, (screenWidth - 200) / members.length);
        const startX = (screenWidth - (members.length - 1) * spacingX) / 2;

        members.forEach((member, memberIndex) => {
          const memberY = genY + 100;
          newNodes.push({
            id: member._id,
            position: { x: startX + memberIndex * spacingX, y: memberY },
            data: { label: member.firstName },
            style: { ...baseStyles, background: "#f1f8e9" },
          });

          newEdges.push({
            id: `e-${genNodeId}-${member._id}`,
            source: genNodeId,
            target: member._id,
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
}, [screenWidth, setNodes, setEdges]);


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
