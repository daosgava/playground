import { createNodeElem } from "../helpers/elementFactory.js";

export class Node {
  constructor(node, nodeMenu) {
    this.node = node;
    this.nodeMenu = nodeMenu;
    this.html = undefined;
    this.timersId = [];
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

  #clearTimers() {
    this.timersId.forEach((id) => clearTimeout(id));
  }

  #attachMenu() {
    const { nodeElem } = this.getElements();

    nodeElem.addEventListener("mouseenter", () => {
      this.#clearTimers();
      const { left, top } = nodeElem.getBoundingClientRect();

      this.nodeMenu.setY(top);
      this.nodeMenu.setX(left);
      this.nodeMenu.show();
    });

    nodeElem.addEventListener("mouseleave", () => {
      const timerId = setTimeout(() => {
        this.nodeMenu.hide();
      }, 1000);

      this.timersId.push(timerId);
    });

    this.nodeMenu.setMouseEnter(() => {
      this.#clearTimers();
    });

    this.nodeMenu.setMouseLeave(() => {
      this.nodeMenu.hide();
    });
  }

  #editHandler() {
    const { nodeElem } = this.getElements();
    nodeElem.addEventListener("keyup", (event) => {
      const keyCode = event.keyCode;
      if (keyCode === 13) {
        this.#editNode(nodeElem.value);
        nodeElem.blur();
      }
    });
  }

  #editNode(newVal) {
    this.node.value = newVal;
  }
}
