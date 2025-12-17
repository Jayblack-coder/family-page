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

        const getChildren = (parentName) =>
          family.filter((member) => member.parents === parentName);

        // Calculate dynamic X positions based on screen width
        const parentNames = ["nwankwo", "asouzu", "udorji", "okoli", "anyaga"];
        const padding = 50; // padding from edges
        const availableWidth = screenWidth - 2 * padding;
        const spacingX = availableWidth / (parentNames.length + 1);

        const firstGen = parentNames.map((name, i) => ({
          id: name,
          label: name.charAt(0).toUpperCase() + name.slice(1),
          x: padding + (i + 1) * spacingX,
        }));

        const newNodes = [
          {
            id: "nmelonye",
            position: { x: screenWidth / 2, y: 0 },
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

        // Add children with dynamic vertical spacing
        firstGen.forEach((parent) => {
          const children = getChildren(parent.label);
          if (!children.length) return;

          const startY = 300;
          const spacingY = Math.max(80, 600 / children.length);

          children.forEach((child, i) => {
            newNodes.push({
              id: child._id,
              position: {
                x: parent.x,
                y: startY + i * spacingY,
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
