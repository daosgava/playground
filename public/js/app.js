import { TreeNode } from "./structures/TreeNode.js";
import { Tree } from "./html/Tree.js";

const initializeTree = (rootContainer) => {
  const root = new TreeNode(1);

  // Tree Nodes
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

  const htmlTree = new Tree(rootContainer, root);
  htmlTree.draw();
};

export const app = () => {
  const treeContainer = document.createElement("div");
  treeContainer.id = "tree";

  const appContainer = document.querySelector("#app");
  appContainer.appendChild(treeContainer);

  initializeTree(treeContainer);
};

app();
