import React, { useState } from 'react';
import { TreeNode } from '../components/HierarchicalTree/types';
import { HierarchicalTree } from '../components/HierarchicalTree/HierarchicalTree';


const reactSrcTree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    hasChildren: true,
    children: [
      {
        id: 'index.tsx',
        label: 'index.tsx',
        hasChildren: false,
      },
      {
        id: 'App.tsx',
        label: 'App.tsx',
        hasChildren: false,
      },
      {
        id: 'components',
        label: 'components',
        hasChildren: true,
        children: [
          {
            id: 'Button.tsx',
            label: 'Button.tsx',
            hasChildren: false,
          },
          {
            id: 'Modal.tsx',
            label: 'Modal.tsx',
            hasChildren: false,
          },
        ],
      },
      {
        id: 'styles',
        label: 'styles',
        hasChildren: true,
        children: [
          {
            id: 'App.css',
            label: 'App.css',
            hasChildren: false,
          },
          {
            id: 'index.css',
            label: 'index.css',
            hasChildren: false,
          },
        ],
      },
    ],
  },
  {
    id: 'public',
    label: 'public',
    hasChildren: true,
    children: [
      {
        id: 'index.html',
        label: 'index.html',
        hasChildren: false,
      },
      {
        id: 'favicon.ico',
        label: 'favicon.ico',
        hasChildren: false,
      },
    ],
  },
  {
    id: 'package.json',
    label: 'package.json',
    hasChildren: false,
  },
  {
    id: 'tsconfig.json',
    label: 'tsconfig.json',
    hasChildren: false,
  },
];



const loadChildren = async (node: TreeNode): Promise<TreeNode[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: `${node.id}-1`, label: `Child 1 of ${node.label}`, hasChildren: false },
        { id: `${node.id}-2`, label: `Child 2 of ${node.label}`, hasChildren: true },
      ]);
    }, 500);
  });
};

export default function App() {
  const [treeData, setTreeData] = useState<TreeNode[]>(reactSrcTree);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hierarchical Tree Demo</h1>
      <HierarchicalTree
        data={treeData}
        onLoadData={loadChildren}
        onChange={setTreeData}
        renderNode={(node: TreeNode, isExpanded: boolean, hasChildren: boolean) => (
          <span style={{ fontWeight: hasChildren ? 'bold' : 'normal' }}>
  {node.label} {hasChildren ? (isExpanded ? '▼' : '▶') : null}
</span>
        )}
      />
    </div>
  );
}