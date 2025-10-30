import { TreeGeneric } from "../TreeGeneric.js";
import { NaryNodeMenu } from "../menu/NaryNodeMenu.js";
import { NaryNode } from "../../structures/NaryNode.js";

export class NaryTree extends TreeGeneric {
  constructor(root, appContainer) {
    super(root, appContainer);
    this.#initNodeMenu();
  }

  #initNodeMenu() {
    const nodeMenu = new NaryNodeMenu();
    nodeMenu.setClickDelete(() => {
      this.delete(this.root, nodeMenu.getSelected().id);
      this.resetTree();
    });

    nodeMenu.setClickAdd(() => {
      const selectedNode = nodeMenu.getSelected();
      const newNode = new NaryNode("");
      selectedNode.addChild(newNode);
      this.resetTree();
      const newNodeElem = document.querySelector(`#node-${newNode.id}`);
      newNodeElem.focus();
    });

    this.nodeMenu = nodeMenu;

    const { menuElem } = this.nodeMenu.getElements();
    this.container.appendChild(menuElem);
  }
}
