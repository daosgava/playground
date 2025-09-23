import { createHtmlElem } from "../helpers/html.js";

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

  clearRootContainer() {
    this.rootContainer.replaceChildren();
  }

  deleteNode(node) {
    node.value = undefined;
    this.clearRootContainer();
    this.drawDF(this.container, this.root);
  }

  addDeleteHandler(elem, node) {
    elem.addEventListener("click", () => {
      this.deleteNode(node);
    });
  }

  createNodeContainer(node) {
    const nodeElem = createHtmlElem({
      tag: "div",
      classes: ["node"],
    });
    const valueElem = createHtmlElem({
      tag: "div",
      classes: ["value"],
      innerText: node.value,
    });
    this.addDeleteHandler(valueElem, node);

    const valueContainerElem = createHtmlElem({
      tag: "div",
      classes: ["value-container"],
    });

    valueContainerElem.appendChild(valueElem);
    nodeElem.appendChild(valueContainerElem);

    return nodeElem;
  }

  appendNodeToPage(node, targetContainer) {
    const nodeElem = this.createNodeContainer(node);
    targetContainer.appendChild(nodeElem);
    targetContainer.classList.add("parent");

    return nodeElem;
  }

  addSeparator(nodeElem, node) {
    const separator = createHtmlElem({ tag: "div", classes: ["separator"] });

    // Improve conditionals
    const hasAChild = node.left || node.right;
    if (hasAChild) {
      const vline = createHtmlElem({ tag: "div", classes: ["vline"] });
      separator.appendChild(vline);
    }

    const hasBothChildren =
      node.left && node.right && node.left.value && node.right.value;
    if (hasBothChildren) {
      const hline = createHtmlElem({ tag: "div", classes: ["hline"] });
      separator.appendChild(hline);
    }

    nodeElem.appendChild(separator);
  }

  drawNode(node, htmlContainer) {
    const nodeElem = this.appendNodeToPage(node, htmlContainer);
    this.addSeparator(nodeElem, node);

    return nodeElem;
  }

  // Based on Depth-First
  drawDF(container, node, isChild) {
    const currentNode = isChild ? node : this.root;
    const currentContainer = isChild ? container : this.rootContainer;

    if (!currentNode?.value) return;

    const nodeElem = this.drawNode(currentNode, currentContainer);

    return (
      this.drawDF(nodeElem, currentNode.left, true) ||
      this.drawDF(nodeElem, currentNode.right, true)
    );
  }
}
