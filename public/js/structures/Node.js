export class TreeNode {
  children = [];
  constructor(value) {
    this.id = window.crypto.randomUUID();
    this.value = value;
  }

  deleteChild(childId) {
    this.children = this.children.filter((child) => child.id !== childId);
  }

  getChildren() {
    return this.children;
  }
}
