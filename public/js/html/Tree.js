import { createSubTreeElem } from "../helpers/elementFactory.js";
import { NodeMenu } from "./NodeMenu.js";
import { Node } from "./Node.js";

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

  #joinLine(node) {
    const { separator, vline, hline } = createSeparatorElem();

    const hasLeft = node.left && node.left?.value !== undefined;
    const hasRight = node.right && node.right?.value !== undefined;

    if (hasLeft || hasRight) {
      separator.appendChild(vline);
    }

    if (hasLeft && hasRight) {
      separator.appendChild(hline);
    }

    return separator;
  }

  // Based on Depth-First
  draw(container, node, isChild) {
    const currentNode = isChild ? node : this.root;
    const currentContainer = isChild ? container : this.rootContainer;

    if (currentNode?.value === undefined) return;

    const htmlNode = new Node(currentNode, this.nodeMenu);

    const { nodeElem } = htmlNode.getElements();
    const { subTreeElem, childrenContainerElem } = createSubTreeElem(nodeElem);

    currentContainer.appendChild(subTreeElem);

    return (
      this.draw(childrenContainerElem, currentNode.left, true) ||
      this.draw(childrenContainerElem, currentNode.right, true)
    );
  }
}
