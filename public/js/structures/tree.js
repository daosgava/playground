import { createHtmlElem, createInputElem } from "../helpers/html.js";

export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class HTMLTree {
  constructor(rootContainer, root) {
    this.rootContainer = rootContainer;
    this.root = root;
  }

  #clearRootContainer() {
    this.rootContainer.replaceChildren();
  }

  #deleteNode(node) {
    node.value = undefined;
    this.#clearRootContainer();
    this.drawTree(this.container, this.root);
  }

  #addNode(node, newVal) {
    node.value = newVal;
    this.#clearRootContainer();
    this.drawTree(this.container, this.root);
  }

  #addHandlers(elem, node) {
    elem.addEventListener("keyup", (event) => {
      const keyCode = event.keyCode;
      if (keyCode === 13) {
        this.#addNode(node, elem.value);
      }
    });
  }

  #createNodeContainer(node) {
    const nodeElem = createHtmlElem({
      tag: "div",
      classes: ["node"],
    });
    const valueElem = createInputElem({
      id: `node-${node.value}`,
      classes: ["value"],
      value: node.value,
    });
    this.#addHandlers(valueElem, node);

    const valueContainerElem = createHtmlElem({
      tag: "div",
      classes: ["value-container"],
    });

    valueContainerElem.appendChild(valueElem);
    nodeElem.appendChild(valueContainerElem);

    return nodeElem;
  }

  #appendNodeToPage(node, targetContainer) {
    const nodeElem = this.#createNodeContainer(node);
    targetContainer.appendChild(nodeElem);
    targetContainer.classList.add("parent");

    return nodeElem;
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

  #drawNode(node, htmlContainer) {
    const nodeElem = this.#appendNodeToPage(node, htmlContainer);
    this.#addJoinLine(nodeElem, node);

    return nodeElem;
  }

  // Based on Depth-First
  drawTree(container, node, isChild) {
    const currentNode = isChild ? node : this.root;
    const currentContainer = isChild ? container : this.rootContainer;

    if (!currentNode?.value) return;

    const nodeElem = this.#drawNode(currentNode, currentContainer);

    return (
      this.drawTree(nodeElem, currentNode.left, true) ||
      this.drawTree(nodeElem, currentNode.right, true)
    );
  }
}
