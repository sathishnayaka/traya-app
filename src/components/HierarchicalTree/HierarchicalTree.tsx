import React, { useState, useCallback } from 'react';
import { TreeNode, HierarchicalTreeProps } from './types';
import { findNodeById, removeNodeById } from './utils';

export const HierarchicalTree: React.FC<HierarchicalTreeProps> = ({
  data,
  onLoadData,
  onChange,
  renderNode,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);

  const toggleNode = useCallback(
    async (node: TreeNode) => {
      const isExpanded = expandedNodes.has(node.id);
      const newSet = new Set(expandedNodes);
      if (isExpanded) {
        newSet.delete(node.id);
      } else {
        if (node.hasChildren && (!node.children || node.children.length === 0)) {
          const children = await onLoadData(node);
          node.children = children;
          onChange([...data]);
        }
        newSet.add(node.id);
      }
      setExpandedNodes(newSet);
    },
    [expandedNodes, onLoadData, onChange, data]
  );

  const onDragStart = (e: React.DragEvent<HTMLLIElement>, node: TreeNode) => {
    e.stopPropagation();
    setDraggingNodeId(node.id);
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent<HTMLLIElement>, node: TreeNode) => {
    e.preventDefault();
    setDragOverNodeId(node.id);
    e.dataTransfer.dropEffect = 'move';
  };

  const onDragLeave = () => {
    setDragOverNodeId(null);
  };

  const onDrop = (e: React.DragEvent<HTMLLIElement>, targetNode: TreeNode) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverNodeId(null);
    const draggedId = e.dataTransfer.getData('text/plain');
    if (!draggedId || draggedId === targetNode.id) return;

    const draggedNode = findNodeById(data, draggedId);
    if (!draggedNode) return;

    let newTree = removeNodeById(data, draggedId);

    const addChild = (nodes: TreeNode[]): TreeNode[] =>
      nodes.map(node => {
        if (node.id === targetNode.id) {
          const children = node.children ? [...node.children, draggedNode] : [draggedNode];
          return { ...node, children, hasChildren: true };
        }
        if (node.children) {
          return { ...node, children: addChild(node.children) };
        }
        return node;
      });

    newTree = addChild(newTree);
    setDraggingNodeId(null);
    onChange(newTree);
  };

  const renderTree = (nodes: TreeNode[]) => (
    <ul className="tree-list">
      {nodes.map(node => {
        const isExpanded = expandedNodes.has(node.id);
        const hasChildren = node.hasChildren || (node.children && node.children.length > 0);
        const isDragOver = dragOverNodeId === node.id;

        return (
          <li
            key={node.id}
            draggable
            className={`tree-item ${draggingNodeId === node.id ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
            onDragStart={e => onDragStart(e, node)}
            onDragOver={e => onDragOver(e, node)}
            onDragLeave={onDragLeave}
            onDrop={e => onDrop(e, node)}
          >
            <div className="tree-node" onClick={() => toggleNode(node)}>
              <span className="tree-label">
                {renderNode ? renderNode(node, isExpanded, hasChildren!) : node.label}
              </span>
            </div>
            {isExpanded && node.children && renderTree(node.children)}
          </li>
        );
      })}
    </ul>
  );

  return <div className="tree-container">{renderTree(data)}</div>;
};