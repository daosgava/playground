export class NaryTreeNode {
  constructor(value) {
    this.id = window.crypto.randomUUID();
    this.value = value;
    this.children = [];
  }
}
