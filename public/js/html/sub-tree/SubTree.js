import { createSubNaryTreeElem } from "../../helpers/element-factory/naryTree.js";
import { Node } from "../tree-node/Node.js";

export class SubTree {
  #rootNode = undefined;
  #html = undefined;
  constructor(rootNode) {
    this.#rootNode = new Node(rootNode);
    this.#createSubtreeElem();
  }

  getRoot() {
    return this.#rootNode;
  }

  #createSubtreeElem() {
    const hasChildren = this.getRoot().getModel().getChildren().length > 0;
    const { subTreeElem, rootElem, childrenContainerElem } =
      createSubNaryTreeElem(hasChildren);
    const { nodeElem } = this.#rootNode.getElements();
    rootElem.appendChild(nodeElem);

    this.#html = { subTreeElem, childrenContainerElem, nodeElem };
  }

  getElements() {
    return this.#html;
  }
}
