import { createHtmlElem } from "../helpers/element-factory/tree.js";

export class TreeGeneric {
  constructor(root, appContainer) {
    this.treeId = window.crypto.randomUUID();
    this.appContainer = appContainer;
    this.root = root;
    this.#createTreeContainer();
    this.#addToPage();
  }

  #createTreeContainer() {
    this.treeContainer = createHtmlElem({
      tag: "div",
      id: `tree-${this.treeId}`,
    });
  }

  getElements() {
    return { treeContainer: this.treeContainer };
  }

  #addToPage() {
    const { treeContainer } = this.getElements();
    this.appContainer.appendChild(treeContainer);
  }

  resetTree() {
    this.#resetRootContainer();
    this.draw();
  }

  #resetRootContainer() {
    this.treeContainer.replaceChildren();
  }

  #connectNodes() {}

  #createSubTree() {}

  draw() {}
  async dfs() {}
  async bfs() {}
  invert() {}
  invertTree() {}
}
