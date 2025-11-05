import { TreeGeneric } from "../TreeGeneric.js";
import { SubTree } from "../sub-tree/SubTree.js";

export class FCNSTree extends TreeGeneric {
  constructor(root, container) {
    super(root, container);
  }

  draw() {
    const subTree = new SubTree(this.root);
    const { subTreeElem } = subTree.getElements();

    const { treeElem } = this.getElements();
    treeElem.appendChild(subTreeElem);

    const queue = [subTree];
    while (queue.length > 0) {
      const subTree = queue.shift();
      const root = subTree.getRoot();
      const { childrenContainerElem: parentContainer } = subTree.getElements();

      if (!root.getModel().value) return;

      const children = [],
        siblings = [];
      const firstChild = root.getModel().getFirstChild();
      siblings.push(firstChild);

      while (siblings.length > 0) {
        const sibling = siblings.shift();
        if (!sibling?.value) continue;
        const siblingSubTree = new SubTree(sibling);
        const { subTreeElem } = siblingSubTree.getElements();
        parentContainer.appendChild(subTreeElem);
        children.push(siblingSubTree);

        const next = sibling.getNextSibling();
        if (next) {
          siblings.push(next);
        }
      }

      this.connectNodes(subTree, children);

      queue.push(...children);
    }
  }
}
