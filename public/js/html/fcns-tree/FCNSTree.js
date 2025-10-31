import { TreeGeneric } from "../TreeGeneric.js";
import { FCNSNode } from "../../structures/FCNSNode.js";

export class FCNSTree extends TreeGeneric {
  constructor(root, container) {
    super(root, container);
  }

  draw(node) {
    const currentNode = node || this.root;
    if (currentNode.value === undefined) return;

    console.log({ currentNode });
    const firstChild = currentNode.getFirstChild();
    const nextSibling = currentNode.getNextSibling();

    if (firstChild) this.draw(firstChild);
    if (nextSibling) this.draw(nextSibling);
  }
}
