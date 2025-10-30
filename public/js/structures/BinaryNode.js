import { TreeNode } from "./Node.js";

export class BinaryNode extends TreeNode {
  constructor(value) {
    super(value);
  }

  getLeft() {
    return this.children[0];
  }

  getRight() {
    return this.children[1];
  }

  setLeft(val) {
    this.children[0] = val;
  }

  setRight(val) {
    this.children[1] = val;
  }
}
