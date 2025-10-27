import { createSubTreeElem } from "../../helpers/element-factory/tree.js";
import { Node } from "../tree-node/Node.js";

export class SubTree {
  constructor(rootNode, nodeMenu) {
    this.rootNode = rootNode;
    this.nodeMenu = nodeMenu;
    this.#createSubtreeElem();
  }

  #createSubtreeElem() {
    // Create HTML Node
    const htmlNode = new Node(this.rootNode, this.nodeMenu);
    const { nodeElem } = htmlNode.getElements();

    // Create Subtree
    const { subTreeElem, rootElem, leftElem, rightElem } = createSubTreeElem();
    rootElem.appendChild(nodeElem);

    this.html = { subTreeElem, leftElem, rightElem, nodeElem };
  }

  getElements() {
    return this.html;
  }
}
