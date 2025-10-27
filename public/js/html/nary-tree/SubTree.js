import { createSubNaryTreeElem } from "../../helpers/element-factory/naryTree.js";
import { Node } from "../tree-node/Node.js";

export class SubTree {
  constructor(rootNode) {
    this.rootNode = rootNode;
    this.#createSubtreeElem();
  }

  #createSubtreeElem() {
    const { subTreeElem, rootElem, childrenContainerElem } =
      createSubNaryTreeElem(this.rootNode);
    const htmlNode = new Node(this.rootNode);
    const { nodeElem } = htmlNode.getElements();
    rootElem.appendChild(nodeElem);

    this.html = { subTreeElem, childrenContainerElem, nodeElem };
  }

  getElements() {
    return this.html;
  }
}
