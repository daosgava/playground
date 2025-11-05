import { createSubTreeElem } from "../../helpers/element-factory/naryTree.js";
import { Node } from "../tree-node/Node.js";
import { FCNSNode } from "../../structures/FCNSNode.js";

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
    const root = this.getRoot().getModel();
    const hasChildren =
      root instanceof FCNSNode
        ? root.getFirstChild()
        : root.getChildren().length > 0;

    const { subTreeElem, rootElem, childrenContainerElem } =
      createSubTreeElem(hasChildren);
    const { nodeElem } = this.#rootNode.getElements();
    rootElem.appendChild(nodeElem);

    this.#html = { subTreeElem, childrenContainerElem, nodeElem };
  }

  getElements() {
    return this.#html;
  }
}
