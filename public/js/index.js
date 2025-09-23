import { TreeNode, HTMLTree } from "./structures/Tree.js";

const initializeTree = () => {
  const root = new TreeNode(1);

  // Adjacency list
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  root.right.left = new TreeNode(6);
  root.right.right = new TreeNode(7);
  root.right.right.left = new TreeNode(8);
  root.right.right.right = new TreeNode(9);
  root.right.right.left.left = new TreeNode(10);
  root.right.right.left.right = new TreeNode(11);
  root.right.right.right.left = new TreeNode(12);
  root.right.right.right.right = new TreeNode(13);
  root.right.right.right.left.left = new TreeNode(14);
  root.right.right.right.left.right = new TreeNode(15);

  const rootContainer = document.querySelector("#tree");

  const htmlTree = new HTMLTree(rootContainer, root);
  htmlTree.drawDF();
};

initializeTree();
