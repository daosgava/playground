import { createNodeElem } from "../../helpers/element-factory/tree.js";
import {
  MOUSE_ENTER,
  MOUSE_LEAVE,
  KEY_UP,
  ENTER_KEY,
} from "../../constants/events.js";

export class Node {
  #model = undefined;
  #html = undefined;
  constructor(node) {
    this.#model = node;
    this.#createNode();
  }

  getModel() {
    return this.#model;
  }

  #createNode() {
    this.#html = createNodeElem(this.#model);
    this.#attachHandlers();
  }

  getElements() {
    return this.#html;
  }

  #attachHandlers() {
    this.#editHandler();
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
    this.#model.value = newVal;
  }

  attachToMenu(nodeMenu) {
    this.nodeMenu = nodeMenu;
    this.#attachEvents();
  }

  #attachEvents() {
    const { nodeElem } = this.getElements();

    nodeElem.addEventListener(MOUSE_ENTER, () => {
      const { top, left } = nodeElem.getBoundingClientRect();

      this.nodeMenu.setSelected(this.#model);
      this.nodeMenu.setY(top);
      this.nodeMenu.setX(left);
      this.nodeMenu.show();
    });

    nodeElem.addEventListener(MOUSE_LEAVE, () => {
      this.nodeMenu.hide();
    });
  }
}
