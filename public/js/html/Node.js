import { createNodeElem } from "../helpers/elementFactory.js";
import {
  MOUSE_ENTER,
  MOUSE_LEAVE,
  KEY_UP,
  ENTER_KEY,
} from "../constants/events.js";

export class Node {
  constructor(node, nodeMenu) {
    this.node = node;
    this.nodeMenu = nodeMenu;
    this.html = undefined;
    this.#createNode();
  }

  #createNode() {
    this.html = createNodeElem(this.node);

    this.#attachHandlers();
    this.#attachMenu();
  }

  getElements() {
    return this.html;
  }

  #attachHandlers() {
    this.#editHandler();
  }

  #attachMenu() {
    const { nodeElem } = this.getElements();

    nodeElem.addEventListener(MOUSE_ENTER, () => {
      const { top, left } = nodeElem.getBoundingClientRect();

      this.nodeMenu.selectedNode = this.node;
      this.nodeMenu.setY(top);
      this.nodeMenu.setX(left);
      this.nodeMenu.show();
    });

    // nodeElem.addEventListener(MOUSE_LEAVE, () => {
    //   this.nodeMenu.hide();
    // });
  }

  #editHandler() {
    const { nodeElem } = this.getElements();
    nodeElem.addEventListener(KEY_UP, (event) => {
      const keyCode = event.keyCode;
      if (keyCode === ENTER_KEY) {
        this.#editNode(nodeElem.value);
        nodeElem.blur();
      }
    });
  }

  #editNode(newVal) {
    this.node.value = newVal;
  }
}
