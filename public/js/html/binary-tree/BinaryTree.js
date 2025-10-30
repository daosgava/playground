import { TreeGeneric } from "../TreeGeneric.js";
import { BinaryNodeMenu } from "../menu/BinaryNodeMenu.js";
import { BinaryNode } from "../../structures/BinaryNode.js";

export class BinaryTree extends TreeGeneric {
  constructor(root, container) {
    super(root, container);
    this.#initNodeMenu();
  }

  #initNodeMenu() {
    const nodeMenu = new BinaryNodeMenu();
    nodeMenu.setClickDelete(() => {
      this.delete(this.root, nodeMenu.getSelected().id);
      this.resetTree();
    });

    const addNodeHandler = ({ isLeft }) => {
      return () => {
        const selectedNode = nodeMenu.getSelected();
        const newNode = new BinaryNode("");
        if (isLeft) {
          selectedNode.setLeft(newNode);
        } else {
          selectedNode.setRight(newNode);
        }
        this.resetTree();
        const newNodeElem = document.querySelector(`#node-${newNode.id}`);
        newNodeElem.focus();
      };
    };

    nodeMenu.setClickLeft(addNodeHandler({ isLeft: true }));
    nodeMenu.setClickRight(addNodeHandler({ isLeft: false }));

    this.nodeMenu = nodeMenu;

    const { menuElem } = this.nodeMenu.getElements();
    this.container.appendChild(menuElem);
  }
}
