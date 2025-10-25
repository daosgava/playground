import { TreeGeneric } from "../TreeGeneric.js";
import { Node } from "../tree-node/Node.js";
import { createSubNaryTreeElem } from "../../helpers/element-factory/naryTree.js";
import { createHtmlElem } from "../../helpers/element-factory/generic.js";

const createSubTree = (node) => {
  const { subTreeElem, rootElem, childrenContainerElem } =
    createSubNaryTreeElem();
  const htmlNode = new Node(node);
  const { nodeElem } = htmlNode.getElements();
  rootElem.appendChild(nodeElem);

  return { subTreeElem, childrenContainerElem, nodeElem };
};

export const createHLine = ({ first, last }) => {
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

export const createLimb = ({ nodeElem, isUpward = false }) => {
  if (!nodeElem) return;
  const elemAnchor = window
    .getComputedStyle(nodeElem)
    .getPropertyValue("anchor-name");

  const limb = createHtmlElem({ tag: "div", classes: ["limb"] });

  limb.style.insetInlineStart = `anchor(${elemAnchor} center)`;
  limb.style[isUpward ? "inset-block-start" : "inset-block-end"] =
    `anchor(${elemAnchor} center)`;

  return limb;
};

export class NaryTree extends TreeGeneric {
  constructor(root, appContainer) {
    super(root, appContainer);
  }

  #connectNodes(children) {
    const hLine = createHLine({
      first: children[0]?.nodeElem,
      last: children[children.length - 1]?.nodeElem,
    });
    if (hLine) this.treeContainer.appendChild(hLine);

    const limbs = children.map(({ nodeElem }) => createLimb({ nodeElem }));
    limbs.forEach((limb) => this.treeContainer.appendChild(limb));
  }

  // Based on Breadth-First
  draw() {
    const { subTreeElem, childrenContainerElem, nodeElem } = createSubTree(
      this.root,
    );
    this.appContainer.appendChild(subTreeElem);

    const queue = [
      { container: childrenContainerElem, node: this.root, nodeElem },
    ];

    while (queue.length > 0) {
      const item = queue.shift();

      const rootLimb = createLimb({ nodeElem: item.nodeElem, isUpward: true });
      if (rootLimb && item.node.getChildren().length > 0)
        this.treeContainer.appendChild(rootLimb);

      const children = item.node.getChildren().map((node) => {
        const { subTreeElem, childrenContainerElem, nodeElem } =
          createSubTree(node);
        item.container.appendChild(subTreeElem);
        return { container: childrenContainerElem, node, nodeElem };
      });

      this.#connectNodes(children);

      queue.push(...children);
    }
  }
}
