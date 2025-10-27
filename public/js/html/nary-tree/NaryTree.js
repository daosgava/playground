import { TreeGeneric } from "../TreeGeneric.js";
import { createHtmlElem } from "../../helpers/element-factory/generic.js";
import { SubTree } from "./SubTree.js";

const createHLine = ({ first, last }) => {
  if (!first || !last) return;

  const firstAnchor = window
    .getComputedStyle(first)
    .getPropertyValue("anchor-name");
  const lastAnchor = window
    .getComputedStyle(last)
    .getPropertyValue("anchor-name");

  const hLine = createHtmlElem({ tag: "div", classes: ["hLine"] });

  hLine.style.insetInlineStart = `anchor(${firstAnchor} center)`;
  hLine.style.insetInlineEnd = `anchor(${lastAnchor} center)`;
  hLine.style.insetBlockEnd = `anchor(${firstAnchor} top)`;

  return hLine;
};

export class NaryTree extends TreeGeneric {
  constructor(root, appContainer) {
    super(root, appContainer);
  }

  #connectNodes(children) {
    const hLine = createHLine({
      first: children[0]?.getElements().nodeElem,
      last: children[children.length - 1]?.getElements().nodeElem,
    });
    if (hLine) this.treeContainer.appendChild(hLine);

    children.forEach((SubTree) => this.#createLimb(SubTree));
  }

  #createLimb(subTree, isUpward = false) {
    const { nodeElem } = subTree.getElements();
    const elemAnchor = window
      .getComputedStyle(nodeElem)
      .getPropertyValue("anchor-name");

    const limb = createHtmlElem({ tag: "div", classes: ["limb"] });

    limb.style.insetInlineStart = `anchor(${elemAnchor} center)`;
    limb.style[isUpward ? "inset-block-start" : "inset-block-end"] =
      `anchor(${elemAnchor} center)`;

    this.treeContainer.appendChild(limb);
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

      if (subTree.rootNode.getChildren().length > 0)
        this.#createLimb(subTree, true);

      const children = subTree.rootNode.getChildren().map((child) => {
        const subTree = new SubTree(child);

        const { subTreeElem } = subTree.getElements();
        parentContainer.appendChild(subTreeElem);

        return subTree;
      });

      this.#connectNodes(children);

      queue.push(...children);
    }
  }
}
