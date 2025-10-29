import { NodeMenu } from "../menu/NodeMenu.js";
import { TreeGeneric } from "../TreeGeneric.js";

export class Tree extends TreeGeneric {
  constructor(root, container) {
    super(root, container);
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
    this.container.appendChild(menuElem);
  }
}
