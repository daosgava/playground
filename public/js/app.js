import { BinaryNode } from "./structures/BinaryNode.js";
import { NaryNode } from "./structures/NaryNode.js";
import { FCNSNode } from "./structures/FCNSNode.js";
import { BinaryTree } from "./html/binary-tree/BinaryTree.js";
import { NaryTree } from "./html/nary-tree/NaryTree.js";
import { FCNSTree } from "./html/fcns-tree/FCNSTree.js";
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

  const root = new BinaryNode(1);

  // Tree Nodes
  const a = new BinaryNode(2);
  const b = new BinaryNode(3);
  root.setLeft(a);
  root.setRight(b);

  const c = new BinaryNode(4);
  const d = new BinaryNode(5);
  a.setLeft(c);
  a.setRight(d);

  const f = new BinaryNode(6);
  const g = new BinaryNode(7);
  b.setLeft(f);
  b.setRight(g);

  const h = new BinaryNode(8);
  const i = new BinaryNode(9);
  f.setLeft(h);
  f.setRight(i);

  const binaryTree = new BinaryTree(root, treeContainer);
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

  const root = new NaryNode(1);

  const a = new NaryNode(2);
  const b = new NaryNode(3);
  const c = new NaryNode(4);
  root.addChild(a);
  root.addChild(b);
  root.addChild(c);

  const d = new NaryNode(5);
  const e = new NaryNode(6);
  a.addChild(d);
  a.addChild(e);

  const f = new NaryNode(7);
  const g = new NaryNode(8);
  d.addChild(f);
  d.addChild(g);

  const h = new NaryNode(9);
  g.addChild(h);

  const naryTree = new NaryTree(root, naryTreeContainer);
  naryTree.draw();

  return naryTree;
};

const initializeFCNSTree = () => {
  const naryTreeContainer = createHtmlElem({
    tag: "div",
    id: "fcns-tree-container",
    classes: ["tree-container"],
  });
  const title = createHtmlElem({
    tag: "h3",
    classes: ["title"],
    innerText: "FCNS Tree",
  });
  naryTreeContainer.appendChild(title);
  appContainer.appendChild(naryTreeContainer);

  // TODO - Let create a parser and convert this node to an array or nodes
  const root = new FCNSNode("R");

  const a = new FCNSNode("A");
  const b = new FCNSNode("B");
  const c = new FCNSNode("C");
  const d = new FCNSNode("D");
  const e = new FCNSNode("E");
  const f = new FCNSNode("F");
  const g = new FCNSNode("G");
  const h = new FCNSNode("H");
  const i = new FCNSNode("I");
  const j = new FCNSNode("J");
  const k = new FCNSNode("K");
  const l = new FCNSNode("L");

  root.setFirstChild(a);

  a.setNextSibling(b);
  b.setNextSibling(c);
  c.setNextSibling(d);

  c.setFirstChild(j);
  j.setFirstChild(k);
  k.setNextSibling(l);

  a.setFirstChild(e);
  e.setNextSibling(f);

  e.setFirstChild(g);
  g.setNextSibling(h);
  g.setNextSibling(i);

  const fcnsTree = new FCNSTree(root, naryTreeContainer);
  fcnsTree.draw();

  return fcnsTree;
};

const app = () => {
  const binaryTreeInstance = initializeBinaryTree();
  const naryTreeInstance = initializeNaryTree();
  const fcnsTreeInstace = initializeFCNSTree();
  initializeOpMenu([binaryTreeInstance, naryTreeInstance]);
};

app();
