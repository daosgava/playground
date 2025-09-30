import { createSeparatorElem } from "../helpers/elementFactory.js";
import { NodeMenu } from "./NodeMenu.js";
import { Node } from "./Node.js";

export class Tree {
  constructor(rootContainer, root) {
    this.rootContainer = rootContainer;
    this.root = root;
    this.nodeMenu = new NodeMenu();
    this.rootContainer.appendChild(this.nodeMenu.elem);
  }

  #resetRootContainer() {
    this.rootContainer.replaceChildren();
    this.rootContainer.appendChild(this.nodeMenu.elem);
  }

  #addJoinLine(nodeElem, node) {
    const { separatorContainer, vline, hline } = createSeparatorElem();

    const hasLeft = node.left && node.left?.value;
    const hasRight = node.right && node.right?.value;

    if (hasLeft || hasRight) {
      separatorContainer.appendChild(vline);
    }

    if (hasLeft && hasRight) {
      separatorContainer.appendChild(hline);
    }

    nodeElem.appendChild(separator);
  }

  #appendElem(nodeContainerElem, htmlContainer) {
    htmlContainer.appendChild(nodeContainerElem);
    htmlContainer.classList.add("parent");
  }

  // Based on Depth-First
  drawTree(container, node, isChild) {
    const currentNode = isChild ? node : this.root;
    const currentContainer = isChild ? container : this.rootContainer;

    if (!currentNode?.value) return;

    const htmlNode = new Node(currentNode, this.nodeMenu);
    const { nodeContainerElem } = htmlNode.getElements();

    this.#appendElem(nodeContainerElem, currentContainer);
    this.#addJoinLine(nodeContainerElem, currentNode);

    return (
      this.drawTree(nodeContainerElem, currentNode.left, true) ||
      this.drawTree(nodeContainerElem, currentNode.right, true)
    );
  }
}
