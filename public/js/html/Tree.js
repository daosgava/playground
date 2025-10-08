import { createSubTreeElem } from "../helpers/elementFactory.js";
import { NodeMenu } from "./NodeMenu.js";
import { Node } from "./Node.js";
import { Connector } from "./Connector.js";

export class Tree {
  constructor(rootContainer, root) {
    this.rootContainer = rootContainer;
    this.root = root;
    this.#initMenu();
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

    const addNodeHandler = (newNode) => {
      this.#resetTree();
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

    const htmlNode = new Node(currentNode, this.nodeMenu);
    const { nodeElem } = htmlNode.getElements();

    const { subTreeElem, rootElem, leftElem, rightElem } = createSubTreeElem();
    rootElem.appendChild(nodeElem);
    currentContainer.appendChild(subTreeElem);

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
}
