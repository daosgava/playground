export class TreeNode {
  constructor(value) {
    this.id = window.crypto.randomUUID();
    this.value = value;
    this.left = null;
    this.right = null;
  }

  getChildren() {
    const children = [];

    if (this.left) {
      children.push(this.left);
    }

    if (this.right) {
      children.push(this.right);
    }

    return children;
  }
}
