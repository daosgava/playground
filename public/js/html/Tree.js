import { createSubTreeElem } from "../helpers/elementFactory.js";
import { NodeMenu } from "./NodeMenu.js";
import { Node } from "./Node.js";
import { Connector } from "./Connector.js";

export class Tree {
  #nodeCounter = 0;

  constructor(rootContainer, root) {
    this.rootContainer = rootContainer;
    this.root = root;
    this.#initMenu();
  }

  #increaseNodeCounter() {
    this.#nodeCounter += 1;
  }

  #resetTree() {
    this.#resetRootContainer();
    this.draw();
  }

  #initMenu() {
    this.nodeMenu = new NodeMenu();
    this.nodeMenu.setClickDelete(() => {
      this.#resetTree();
    });
    this.nodeMenu.setClickLeft(() => {
      this.#resetTree();
    });
    this.nodeMenu.setClickRight(() => {
      this.#resetTree();
    });
    const { menuElem } = this.nodeMenu.getElements();
    this.rootContainer.appendChild(menuElem);
  }

  #resetRootContainer() {
    this.rootContainer.replaceChildren();
    this.#initMenu();
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

    const htmlNode = new Node(currentNode, this.nodeMenu, this.#nodeCounter);

    const { nodeElem } = htmlNode.getElements();
    const { subTreeElem, rootElem, leftElem, rightElem } =
      createSubTreeElem(nodeElem);

    rootElem.appendChild(nodeElem);
    currentContainer.appendChild(subTreeElem);

    this.#connectNodes(parentNode, nodeElem, isLeft);
    this.#increaseNodeCounter();

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
}
