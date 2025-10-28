import { NodeMenu } from "../menu/NodeMenu.js";
import { TreeGeneric } from "../TreeGeneric.js";

export class Tree extends TreeGeneric {
  constructor(root, appContainer) {
    super(root, appContainer);
    this.#initNodeMenu();
  }

  #initNodeMenu() {
    this.nodeMenu = new NodeMenu();
    this.nodeMenu.setClickDelete(() => {
      this.resetTree();
    });

    const addNodeHandler = (newNode) => {
      this.resetTree();
      const newNodeElem = document.querySelector(`#node-${newNode.id}`);
      newNodeElem.focus();
    };

    this.nodeMenu.setClickLeft(addNodeHandler);
    this.nodeMenu.setClickRight(addNodeHandler);

    const { menuElem } = this.nodeMenu.getElements();
    const { treeElem } = this.getElements();
    treeElem.appendChild(menuElem);
  }

  invert() {
    this.invertTree();
    this.resetTree();
  }

  invertTree(node, isChild) {
    const currentNode = isChild ? node : this.root;
    if (!currentNode?.value) return false;

    const temp = currentNode.left;
    currentNode.left = currentNode.right;
    currentNode.right = temp;

    return (
      this.invertTree(currentNode.left, true) ||
      this.invertTree(currentNode.right, true)
    );
  }

  resetTree() {
    super.resetTree();
    this.#initNodeMenu();
  }
}
