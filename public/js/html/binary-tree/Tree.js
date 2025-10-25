import { createSubTreeElem } from "../../helpers/element-factory/tree.js";
import { wait } from "../../helpers/timers.js";
import { NodeMenu } from "../menu/NodeMenu.js";
import { Node } from "../tree-node/Node.js";
import { Connector } from "./Connector.js";
import { TreeGeneric } from "../TreeGeneric.js";

export class Tree extends TreeGeneric {
  constructor(root, appContainer) {
    super(root, appContainer);
    this.#initNodeMenu();
  }

  resetTree() {
    this.#resetRootContainer();
    this.draw();
  }

  #resetRootContainer() {
    this.treeContainer.replaceChildren();
    this.#initNodeMenu();
  }

  #initNodeMenu() {
    this.nodeMenu = new NodeMenu();
    this.nodeMenu.setClickDelete(() => {
      this.resetTree();
    });

    const addNodeHandler = (newNode) => {
      this.resetTree();
      const newNodeElem = document.querySelector(`#node-${newNode.id}`);
      newNodeElem.focus();
    };

    this.nodeMenu.setClickLeft(addNodeHandler);
    this.nodeMenu.setClickRight(addNodeHandler);

    const { menuElem } = this.nodeMenu.getElements();
    this.treeContainer.appendChild(menuElem);
  }

  #connectNodes(parentNode, currentNode, isLeft) {
    if (!parentNode || !currentNode) return;
    const connector = new Connector(parentNode, currentNode, isLeft);
    const { connectorElem } = connector.getElements();

    this.treeContainer.appendChild(connectorElem);
  }

  #createSubTree(currentNode) {
    // Create HTML Node
    const htmlNode = new Node(currentNode, this.nodeMenu);
    const { nodeElem } = htmlNode.getElements();

    // Create Subtree
    const { subTreeElem, rootElem, leftElem, rightElem } = createSubTreeElem();
    rootElem.appendChild(nodeElem);

    return { subTreeElem, leftElem, rightElem, nodeElem };
  }

  // Based on Depth-First
  draw({ container, node, isChild, parentNode, isLeft } = {}) {
    const currentNode = isChild ? node : this.root;
    const currentContainer = isChild ? container : this.treeContainer;

    if (currentNode?.value === undefined) return;

    const { nodeElem, leftElem, rightElem, subTreeElem } =
      this.#createSubTree(currentNode);
    currentContainer.appendChild(subTreeElem);

    // Connect Nodes
    this.#connectNodes(parentNode, nodeElem, isLeft);

    return (
      this.draw({
        container: leftElem,
        node: currentNode.left,
        isChild: true,
        parentNode: nodeElem,
        isLeft: true,
      }) ||
      this.draw({
        container: rightElem,
        node: currentNode.right,
        isChild: true,
        parentNode: nodeElem,
        isLeft: false,
      })
    );
  }

  async dfs(node, target) {
    if (node?.value === undefined) {
      return false;
    }

    const foundElement = document.querySelector(`#node-${node.id}`);

    if (node.value === target || node.value === Number(target)) {
      foundElement.classList.add("found");
    }

    foundElement.classList.toggle("highlight");
    await wait(0.4);
    foundElement.classList.toggle("highlight");

    return (
      (await this.dfs(node?.left, target)) ||
      (await this.dfs(node?.right, target))
    );
  }

  async bfs(node, target) {
    const queue = [node];

    while (queue.length > 0) {
      const node = queue.shift();

      const foundElement = document.querySelector(`#node-${node.id}`);

      if (node.value === target || node.value === Number(target)) {
        foundElement.classList.add("found");
      }

      foundElement.classList.toggle("highlight");
      await wait(0.4);
      foundElement.classList.toggle("highlight");

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  invert() {
    this.invertTree();
    this.resetTree();
  }

  invertTree(node, isChild) {
    const currentNode = isChild ? node : this.root;
    if (!currentNode?.value) return false;

    const temp = currentNode.left;
    currentNode.left = currentNode.right;
    currentNode.right = temp;

    return (
      this.invertTree(currentNode.left, true) ||
      this.invertTree(currentNode.right, true)
    );
  }
}
