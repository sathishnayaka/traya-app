import { TreeNode } from './types';

export const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const removeNodeById = (nodes: TreeNode[], id: string): TreeNode[] => {
  return nodes
    .map(node => {
      if (node.id === id) return null;
      if (node.children) {
        node.children = removeNodeById(node.children, id);
      }
      return node;
    })
    .filter(Boolean) as TreeNode[];
};
