export class TreeNode {
  constructor(value) {
    this.id = window.crypto.randomUUID();
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
