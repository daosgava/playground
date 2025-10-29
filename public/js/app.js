import { TreeNode } from "./structures/TreeNode.js";
import { NaryTreeNode } from "./structures/NaryTreeNode.js";
import { Tree } from "./html/binary-tree/Tree.js";
import { NaryTree } from "./html/nary-tree/NaryTree.js";
import { OpMenu } from "./html/menu/OpMenu.js";
import { APP_ID } from "./constants/app.js";
import { createHtmlElem } from "./helpers/element-factory/generic.js";

const appContainer = document.querySelector(APP_ID);

const initializeBinaryTree = () => {
  const treeContainer = createHtmlElem({
    tag: "div",
    id: "binary-tree-container",
    classes: ["tree-container"],
  });
  const title = createHtmlElem({
    tag: "h3",
    classes: ["title"],
    innerText: "Binary Tree",
  });
  treeContainer.appendChild(title);
  appContainer.appendChild(treeContainer);

  const root = new TreeNode(1);

  // Tree Nodes
  const a = new TreeNode(2);
  const b = new TreeNode(3);
  root.setLeft(a);
  root.setRight(b);

  const c = new TreeNode(4);
  const d = new TreeNode(5);
  a.setLeft(c);
  a.setRight(d);

  const f = new TreeNode(6);
  const g = new TreeNode(7);
  b.setLeft(f);
  b.setRight(g);

  const h = new TreeNode(8);
  const i = new TreeNode(9);
  f.setLeft(h);
  f.setRight(i);

  const binaryTree = new Tree(root, treeContainer);
  binaryTree.draw();

  return binaryTree;
};

const initializeOpMenu = (treeInstance) => {
  const opMenu = new OpMenu(treeInstance);
  const { menuElem } = opMenu.getElements();
  appContainer.appendChild(menuElem);
};

const initializeNaryTree = () => {
  const naryTreeContainer = createHtmlElem({
    tag: "div",
    id: "nary-tree-container",
    classes: ["tree-container"],
  });
  const title = createHtmlElem({
    tag: "h3",
    classes: ["title"],
    innerText: "Nary Tree",
  });
  naryTreeContainer.appendChild(title);
  appContainer.appendChild(naryTreeContainer);

  const root = new NaryTreeNode(1);

  const a = new NaryTreeNode(2);
  const b = new NaryTreeNode(3);
  const c = new NaryTreeNode(4);
  root.addChild(a);
  root.addChild(b);
  root.addChild(c);

  const d = new NaryTreeNode(5);
  const e = new NaryTreeNode(6);
  a.addChild(d);
  a.addChild(e);

  const f = new NaryTreeNode(7);
  const g = new NaryTreeNode(8);
  d.addChild(f);
  d.addChild(g);

  const h = new NaryTreeNode(9);
  g.addChild(h);

  const naryTree = new NaryTree(root, naryTreeContainer);
  naryTree.draw();

  return naryTree;
};

const app = () => {
  const binaryTreeInstance = initializeBinaryTree();
  const naryTreeInstance = initializeNaryTree();
  initializeOpMenu([binaryTreeInstance, naryTreeInstance]);
};

app();
