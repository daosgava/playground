import { wait } from "../helpers/timers.js";
import { createHtmlElem } from "../helpers/element-factory/tree.js";
import { SubTree } from "./sub-tree/SubTree.js";
import { Connector } from "./connector/Connector.js";

export class TreeGeneric {
  constructor(root, container) {
    this.treeId = window.crypto.randomUUID();
    this.root = root;
    this.container = container;
    this.#createTreeContainer();
    this.#addToContainer();
  }

  #createTreeContainer() {
    const treeElem = createHtmlElem({
      tag: "div",
      id: `tree-${this.treeId}`,
      classes: ["tree"],
    });

    this.html = { treeElem };
  }

  getElements() {
    return this.html;
  }

  #addToContainer() {
    const { treeElem } = this.getElements();
    this.container.appendChild(treeElem);
  }

  #connectNodes(root, children) {
    if (children.length === 0) return;

    const rootLimb = Connector.createLimb(root, true);
    this.container.appendChild(rootLimb);

    const connector = new Connector(children);
    const { hLine, limbs } = connector.getElements();

    if (hLine) this.container.appendChild(hLine);

    limbs.forEach((limb) => this.container.appendChild(limb));
  }

  // Based on Breadth-First
  draw() {
    const subTree = new SubTree(this.root);
    const { subTreeElem } = subTree.getElements();

    const { treeElem } = this.getElements();
    treeElem.appendChild(subTreeElem);

    const queue = [subTree];

    while (queue.length > 0) {
      const subTree = queue.shift();
      const { childrenContainerElem: parentContainer } = subTree.getElements();

      const children = subTree.rootNode.getChildren().map((child) => {
        const subTree = new SubTree(child);

        const { subTreeElem } = subTree.getElements();
        parentContainer.appendChild(subTreeElem);

        return subTree;
      });

      this.#connectNodes(subTree, children);

      queue.push(...children);
    }
  }

  resetTree() {
    const { treeElem } = this.getElements();
    treeElem.replaceChildren();
    this.draw();
  }

  async bfs(node, target) {
    const queue = [node];

    while (queue.length > 0) {
      const node = queue.shift();
      const foundElement = document.querySelector(`#node-${node.id}`);

      if (node.value === target || node.value === Number(target)) {
        foundElement.classList.add("found");
      }

      foundElement.classList.toggle("highlight");
      await wait(0.4);
      foundElement.classList.toggle("highlight");

      queue.push(...node.getChildren());
    }
  }
}
