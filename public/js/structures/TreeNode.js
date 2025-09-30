import { createHtmlElem, createNodeElem } from "../helpers/elementFactory.js";
import { NodeMenu } from "./NodeMenu.js";

export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class HTMLNode {
  constructor(node, nodeMenu) {
    this.node = node;
    this.nodeMenu = nodeMenu;
    this.html = undefined;
    this.timersId = [];
    this.#createNode();
  }

  #createNode() {
    this.html = createNodeElem(this.node);

    this.#addHandlers();
    this.#attachMenu();
  }

  #addHandlers() {
    this.#editHandler();
    // TODO - Add more handlers
  }

  getElements() {
    return this.html;
  }

  #cleanTimers() {
    this.timersId.forEach((id) => clearTimeout(id));
  }

  #attachMenu() {
    const { nodeElem } = this.getElements();
    nodeElem.addEventListener("mouseenter", () => {
      this.#cleanTimers();
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
      this.#cleanTimers();
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

export class HTMLTree {
  constructor(rootContainer, root) {
    this.rootContainer = rootContainer;
    this.root = root;
    this.nodeMenu = new NodeMenu();
    this.rootContainer.appendChild(this.nodeMenu.elem);
  }

  #resetRootContainer() {
    this.rootContainer.replaceChildren();
    this.rootContainer.appendChild(this.nodeMenu.elem);
  }

  #addJoinLine(nodeElem, node) {
    const separator = createHtmlElem({ tag: "div", classes: ["separator"] });

    const hasLeft = node.left && node.left?.value;
    const hasRight = node.right && node.right?.value;

    if (hasLeft || hasRight) {
      const vline = createHtmlElem({ tag: "div", classes: ["vline"] });
      separator.appendChild(vline);
    }

    if (hasLeft && hasRight) {
      const hline = createHtmlElem({ tag: "div", classes: ["hline"] });
      separator.appendChild(hline);
    }

    nodeElem.appendChild(separator);
  }

  #appendElem(nodeContainerElem, htmlContainer) {
    htmlContainer.appendChild(nodeContainerElem);
    htmlContainer.classList.add("parent");
  }

  // Based on Depth-First
  drawTree(container, node, isChild) {
    const currentNode = isChild ? node : this.root;
    const currentContainer = isChild ? container : this.rootContainer;

    if (!currentNode?.value) return;

    const htmlNode = new HTMLNode(currentNode, this.nodeMenu);
    const { nodeContainerElem } = htmlNode.getElements();

    this.#appendElem(nodeContainerElem, currentContainer);
    this.#addJoinLine(nodeContainerElem, currentNode);

    return (
      this.drawTree(nodeContainerElem, currentNode.left, true) ||
      this.drawTree(nodeContainerElem, currentNode.right, true)
    );
  }
}
