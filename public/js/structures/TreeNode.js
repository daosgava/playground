export class TreeNode {
  #children = [];
  constructor(value) {
    this.id = window.crypto.randomUUID();
    this.value = value;
  }

  setLeft(val) {
    this.#children[0] = val;
  }

  setRight(val) {
    this.#children[1] = val;
  }

  removeChildren() {
    this.#children = [];
  }

  getChildren() {
    return this.#children;
  }
}
