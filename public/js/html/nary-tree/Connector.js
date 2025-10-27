import { createHtmlElem } from "../../helpers/element-factory/generic.js";

export class Connector {
  constructor(children) {
    this.children = children;
    const firstChild = children[0]?.getElements()?.nodeElem;
    const lastChild = children[children.length - 1]?.getElements()?.nodeElem;
    this.#createHLine(firstChild, lastChild);
    this.#connectChildren();
  }

  #createHLine(first, last) {
    if (!first || !last) return;

    const firstAnchor = window
      .getComputedStyle(first)
      .getPropertyValue("anchor-name");
    const lastAnchor = window
      .getComputedStyle(last)
      .getPropertyValue("anchor-name");

    const hLine = createHtmlElem({ tag: "div", classes: ["hLine"] });

    hLine.style.insetInlineStart = `anchor(${firstAnchor} center)`;
    hLine.style.insetInlineEnd = `anchor(${lastAnchor} center)`;
    hLine.style.insetBlockEnd = `anchor(${firstAnchor} top)`;
    this.hLine = hLine;
  }

  #connectChildren() {
    this.limbs = this.children.map((subTree) => Connector.createLimb(subTree));
  }

  static createLimb(subTree, isUpward = false) {
    const { nodeElem } = subTree.getElements();
    const elemAnchor = window
      .getComputedStyle(nodeElem)
      .getPropertyValue("anchor-name");

    const limb = createHtmlElem({ tag: "div", classes: ["limb"] });

    limb.style.insetInlineStart = `anchor(${elemAnchor} center)`;
    limb.style[isUpward ? "inset-block-start" : "inset-block-end"] =
      `anchor(${elemAnchor} center)`;

    return limb;
  }

  getElements() {
    return { hLine: this.hLine, limbs: this.limbs };
  }
}
