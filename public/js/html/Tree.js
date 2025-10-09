import { createSubTreeElem } from "../helpers/elementFactory.js";
import { wait } from "../helpers/timers.js";
import { NodeMenu } from "./NodeMenu.js";
import { Node } from "./Node.js";
import { Connector } from "./Connector.js";

export class Tree {
  constructor(rootContainer, root) {
    this.rootContainer = rootContainer;
    this.root = root;
    this.#initNodeMenu();
  }

  resetTree() {
    this.#resetRootContainer();
    this.draw();
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
    this.rootContainer.appendChild(menuElem);
  }

  #resetRootContainer() {
    this.rootContainer.replaceChildren();
    this.#initNodeMenu();
  }

  #connectNodes(parentNode, currentNode, isLeft) {
    if (!parentNode || !currentNode) return;
    const connector = new Connector(parentNode, currentNode, isLeft);
    const { connectorElem } = connector.getElements();

    this.rootContainer.appendChild(connectorElem);
  }

  // Based on Depth-First
  draw({ container, node, isChild, parentNode, isLeft } = {}) {
    const currentNode = isChild ? node : this.root;
    const currentContainer = isChild ? container : this.rootContainer;

    if (currentNode?.value === undefined) return;

    // Create HTML Node
    const htmlNode = new Node(currentNode, this.nodeMenu);
    const { nodeElem } = htmlNode.getElements();

    // Create Subtree
    const { subTreeElem, rootElem, leftElem, rightElem } = createSubTreeElem();

    // Place elements on the page
    rootElem.appendChild(nodeElem);
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

  async searchNodeDF(node, target) {
    if (node?.value === undefined) {
      return false;
    }

    const foundElement = document.querySelector(`#node-${node.id}`);

    if (node.value === target || node.value === Number(target)) {
      foundElement.classList.add("found");
      return true;
    }

    foundElement.classList.toggle("highlight");
    await wait(0.4);
    foundElement.classList.toggle("highlight");

    return (
      (await this.searchNodeDF(node?.left, target)) ||
      (await this.searchNodeDF(node?.right, target))
    );
  }
}
