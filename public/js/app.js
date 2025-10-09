import { TreeNode } from "./structures/TreeNode.js";
import { Tree } from "./html/Tree.js";
import { OpMenu } from "./html/OpMenu.js";
import { APP_ID } from "./constants/app.js";

const appContainer = document.querySelector(APP_ID);

const initializeTree = () => {
  const root = new TreeNode(1);

  // Tree Nodes
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.right.left = new TreeNode(6);
  root.right.right = new TreeNode(7);
  root.right.right.left = new TreeNode(10);
  root.right.right.right = new TreeNode(11);
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  root.left.left.left = new TreeNode(8);
  root.left.left.right = new TreeNode(9);

  const htmlTree = new Tree(root);
  const { treeContainer } = htmlTree.getElements();
  appContainer.appendChild(treeContainer);

  htmlTree.draw();

  return htmlTree;
};

const initializeMenu = (treeInstance) => {
  const menu = new OpMenu(treeInstance);
  const { containerElem } = menu.getElements();
  appContainer.appendChild(containerElem);
};

const app = () => {
  const treeInstance = initializeTree();
  initializeMenu(treeInstance);
};

app();
