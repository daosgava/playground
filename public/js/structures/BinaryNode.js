import { TreeNode } from "./Node.js";

export class BinaryNode extends TreeNode {
  constructor(value) {
    super(value);
  }

  setLeft(val) {
    this.children[0] = val;
  }

  setRight(val) {
    this.children[1] = val;
  }
}
