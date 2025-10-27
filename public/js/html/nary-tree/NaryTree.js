import { TreeGeneric } from "../TreeGeneric.js";
import { SubTree } from "./SubTree.js";
import { Connector } from "./Connector.js";

export class NaryTree extends TreeGeneric {
  constructor(root, appContainer) {
    super(root, appContainer);
  }

  #connectNodes(rootSubTree, children) {
    if (children.length === 0) return;

    const rootLimb = Connector.createLimb(rootSubTree, true);
    this.treeContainer.appendChild(rootLimb);

    const connector = new Connector(children);
    const { hLine, limbs } = connector.getElements();

    if (hLine) this.treeContainer.appendChild(hLine);

    limbs.forEach((limb) => this.treeContainer.appendChild(limb));
  }

  // Based on Breadth-First
  draw() {
    const subTree = new SubTree(this.root);
    const { subTreeElem } = subTree.getElements();
    this.appContainer.appendChild(subTreeElem);
    const queue = [subTree];

    while (queue.length > 0) {
      const subTree = queue.shift();
      const { childrenContainerElem: parentContainer } = subTree.getElements();

      const children = subTree.rootNode.getChildren().map((child) => {
        const subTree = new SubTree(child);

        const { subTreeElem } = subTree.getElements();
        parentContainer.appendChild(subTreeElem);

        return subTree;
      });

      this.#connectNodes(subTree, children);

      queue.push(...children);
    }
  }
}
