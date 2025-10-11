import { TreeNode } from "./structures/TreeNode.js";
import { NaryTreeNode } from "./structures/NaryTreeNode.js";
import { Tree } from "./html/Tree.js";
import { NaryTree } from "./html/NaryTree.js";
import { OpMenu } from "./html/OpMenu.js";
import { APP_ID } from "./constants/app.js";
import { createHtmlElem } from "./helpers/element-factory/generic.js";

const appContainer = document.querySelector(APP_ID);

const initializeTree = () => {
  const treeContainer = createHtmlElem({
    tag: "div",
    id: "tree-container",
    classes: [],
  });
  appContainer.appendChild(treeContainer);

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

  const htmlTree = new Tree(root, treeContainer);
  htmlTree.draw();

  return htmlTree;
};

const initializeOpMenu = (treeInstance) => {
  new OpMenu(treeInstance, appContainer);
};

const initializeNaryTree = () => {
  const naryTreeContainer = createHtmlElem({
    tag: "div",
    id: "nary-tree-container",
    classes: [],
  });
  appContainer.appendChild(naryTreeContainer);

  const root = new NaryTreeNode(1);
  root.addChild(new NaryTreeNode(2));
  root.addChild(new NaryTreeNode(3));
  root.addChild(new NaryTreeNode(4));

  const children = root.getChildren();
  children[1].addChild(new NaryTreeNode(5));
  children[1].addChild(new NaryTreeNode(6));
  children[1].addChild(new NaryTreeNode(7));
  children[2].addChild(new NaryTreeNode(8));
  children[2].addChild(new NaryTreeNode(9));

  const naryTree = new NaryTree(root, naryTreeContainer);
  naryTree.draw();
};

const app = () => {
  const treeInstance = initializeTree();
  initializeOpMenu(treeInstance);

  initializeNaryTree();
};

app();
