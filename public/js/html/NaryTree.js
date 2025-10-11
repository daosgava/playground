import { Tree } from "./Tree.js";
import { Node } from "./Node.js";
import { createSubNaryTreeElem } from "../helpers/element-factory/naryTree.js";

const createSubTree = (node) => {
  const { subTreeElem, rootElem, childrenContainerElem } =
    createSubNaryTreeElem();
  const htmlNode = new Node(node);
  const { nodeElem } = htmlNode.getElements();
  rootElem.appendChild(nodeElem);

  return { subTreeElem, childrenContainerElem };
};

export class NaryTree extends Tree {
  constructor(root, appContainer) {
    super(root, appContainer);
  }
  
  

  // Based on Breadth-First
  draw() {
    const { subTreeElem, childrenContainerElem } = createSubTree(this.root);
    this.appContainer.appendChild(subTreeElem);
    const queue = [{ container: childrenContainerElem, node: this.root }];

    while (queue.length > 0) {
      const item = queue.shift();

      const children = item.node.getChildren().map((node) => {
        const { subTreeElem, childrenContainerElem } = createSubTree(node);
        item.container.appendChild(subTreeElem);
        return { container: childrenContainerElem, node };
      });

      queue.push(...children);
    }
  }
}
