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
      const res = await API.get("/api/user");
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

      const parentNames = ["Nwankwo", "Asouzu", "Udorji", "Okoli", "Anyaga"];
      const padding = 50;
      const availableWidth = screenWidth - 2 * padding;
      const spacingX = availableWidth / (parentNames.length + 1);

      // First Generation nodes
      parentNames.forEach((name, i) => {
        newNodes.push({
          id: name.toLowerCase(),
          position: { x: padding + (i + 1) * spacingX, y: 150 },
          data: { label: name },
          style: { ...baseStyles, background: "#e3f2fd" },
        });
      });

      const newEdges = parentNames.map((name) => ({
        id: `e-nmelonye-${name.toLowerCase()}`,
        source: "nmelonye",
        target: name.toLowerCase(),
      }));

      // Add children
      family.forEach((member) => {
        if (member.parents) {
          const parentId = member.parents.toLowerCase();
          const parentNode = newNodes.find((n) => n.id === parentId);
          if (!parentNode) return;

          // Calculate dynamic Y position
          const siblings = family.filter((m) => m.parents === member.parents);
          const index = siblings.findIndex((s) => s._id === member._id);
          const spacingY = Math.max(80, 600 / siblings.length);
          const startY = 300;

          newNodes.push({
            id: member._id,
            position: { x: parentNode.position.x, y: startY + index * spacingY },
            data: { label: member.firstName },
            style: { ...baseStyles, background: "#f1f8e9" },
          });

          newEdges.push({
            id: `e-${parentId}-${member._id}`,
            source: parentId,
            target: member._id,
          });
        }
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
