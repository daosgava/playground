import { createNodeElem } from "../helpers/elementFactory.js";
import {
  MOUSE_ENTER,
  MOUSE_LEAVE,
  KEY_UP,
  ENTER_KEY,
} from "../constants/events.js";

export class Node {
  constructor(node, nodeMenu, eventCallbacks) {
    this.node = node;
    this.nodeMenu = nodeMenu;
    this.eventCallbacks = eventCallbacks;
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
      const { bottom, right } = nodeElem.getBoundingClientRect();

      this.nodeMenu.selectedNode = this.node;
      this.nodeMenu.setY(bottom);
      this.nodeMenu.setX(right);
      this.nodeMenu.show();
    });

    nodeElem.addEventListener(MOUSE_LEAVE, () => {
      this.nodeMenu.hide();
    });
  }

  #editHandler() {
    const { nodeElem } = this.getElements();
    nodeElem.addEventListener(KEY_UP, (event) => {
      const keyCode = event.keyCode;
      if (keyCode === ENTER_KEY) {
        this.#editNode(nodeElem.value);
        this.eventCallbacks.edit?.();
        nodeElem.blur();
      }
    });
  }

  #editNode(newVal) {
    this.node.value = newVal;
  }
}
