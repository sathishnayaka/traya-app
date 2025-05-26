export interface TreeNode {
  id: string;
  label: string;
  hasChildren?: boolean;
  children?: TreeNode[];
}

export interface HierarchicalTreeProps {
  data: TreeNode[];
  onLoadData: (node: TreeNode) => Promise<TreeNode[]>;
  onChange: (newTree: TreeNode[]) => void;
  renderNode?: (node: TreeNode, isExpanded: boolean, hasChildren: boolean) => React.ReactNode;
}
