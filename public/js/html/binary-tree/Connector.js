import { createConnectorElem } from "../../helpers/element-factory/tree.js";

export class Connector {
  constructor(parent, current, isLeft) {
    this.parent = parent;
    this.current = current;
    this.isLeft = isLeft;
    this.#createConnector();
    this.#setPosition();
  }

  #createConnector() {
    this.connectorElem = createConnectorElem();
  }

  #setPosition() {
    const parentAnchor = window
      .getComputedStyle(this.parent)
      .getPropertyValue("anchor-name");
    const currentAnchor = window
      .getComputedStyle(this.current)
      .getPropertyValue("anchor-name");

    /*

      inset-block-start = top side
      inset-block-end = bottom side

      inset-inline-start = left side
      inset-inline-end = right side

    */

    const { connectorElem } = this.getElements();
    connectorElem.style.insetBlockStart = `anchor(${parentAnchor} center)`;
    connectorElem.style.insetInlineStart = `anchor(${this.isLeft ? currentAnchor : parentAnchor} center)`;
    connectorElem.style.insetInlineEnd = `anchor(${this.isLeft ? parentAnchor : currentAnchor} center)`;
    connectorElem.style.insetBlockEnd = `anchor(${currentAnchor} center)`;
    if (this.isLeft) {
      connectorElem.style.borderRight = "none";
    } else {
      connectorElem.style.borderLeft = "none";
    }
  }

  getElements() {
    return this.connectorElem;
  }
}
