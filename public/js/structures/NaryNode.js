import { TreeNode } from "./Node.js";

export class NaryNode extends TreeNode {
  constructor(value) {
    super(value);
  }

  addChild(child) {
    this.children.push(child);
  }
}
