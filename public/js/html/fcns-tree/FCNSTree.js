import { TreeGeneric } from "../TreeGeneric.js";
import { SubTree } from "../sub-tree/SubTree.js";
import { wait } from "../../helpers/timers.js";

const highlightNode = async (node) => {
  const foundElement = document.querySelector(`#node-${node.id}`);
  foundElement.classList.toggle("highlight");
  await wait(0.4);
  foundElement.classList.toggle("highlight");
};

const highlightFoundNode = (node) => {
  const foundElement = document.querySelector(`#node-${node.id}`);
  foundElement.classList.toggle("found");
};

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

  async kthChild(node, p, k) {
    if (!node?.value) return;

    await highlightNode(node);

    if (node.value === p) {
      const queue = [];
      const child = node.getFirstChild();
      if (child?.value) queue.push(child);

      let childCounter = 1;
      while (queue?.length && childCounter < Number(k)) {
        const child = queue.shift();
        await highlightNode(child);

        const nextSibling = child?.getNextSibling();
        if (nextSibling) queue.push(nextSibling);
        childCounter++;
      }

      if (queue.length) {
        const child = queue.shift();
        await highlightNode(child);
        highlightFoundNode(child);
        return child;
      }
    }

    await this.kthChild(node.getFirstChild(), p, k);
    await this.kthChild(node.getNextSibling(), p, k);
  }
}
