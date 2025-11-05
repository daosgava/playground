// First Child / Next Sibling
export class FCNSNode {
  #firstChild = null;
  #nextSibling = null;
  constructor(value) {
    this.id = window.crypto.randomUUID();
    this.value = value;
  }

  setFirstChild(val) {
    this.#firstChild = val;
  }

  setNextSibling(val) {
    this.#nextSibling = val;
  }

  getFirstChild() {
    return this.#firstChild;
  }

  getNextSibling() {
    return this.#nextSibling;
  }
}
