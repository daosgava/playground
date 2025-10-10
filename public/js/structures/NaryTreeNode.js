export class NaryTreeNode {
  #children = [];
  constructor(value) {
    this.id = window.crypto.randomUUID();
    this.value = value;
  }

  addChild(child) {
    this.#children.push(child);
  }

  getChildren() {
    return this.#children;
  }
}
