import { NodeMenu } from "../menu/NodeMenu.js";
import { TreeGeneric } from "../TreeGeneric.js";

export class Tree extends TreeGeneric {
  constructor(root, container) {
    super(root, container);
    this.#initNodeMenu();
  }

  #initNodeMenu() {
    const nodeMenu = new NodeMenu();
    nodeMenu.setClickDelete(() => {
      this.resetTree();
    });

    const addNodeHandler = (newNode) => {
      this.resetTree();
      const newNodeElem = document.querySelector(`#node-${newNode.id}`);
      newNodeElem.focus();
    };

    nodeMenu.setClickLeft(addNodeHandler);
    nodeMenu.setClickRight(addNodeHandler);

    const { menuElem } = nodeMenu.getElements();
    this.container.appendChild(menuElem);
  }
}
