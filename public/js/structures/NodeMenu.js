import { createNodeMenuElem } from "../helpers/elementFactory.js";

export class NodeMenu {
  constructor() {
    this.elem = createNodeMenuElem();
  }

  setMouseEnter(cb) {
    this.elem.addEventListener("mouseenter", cb);
  }

  setMouseLeave(cb) {
    this.elem.addEventListener("mouseleave", cb);
  }

  setX(x) {
    this.elem.style.left = `${x}px`;
  }

  setY(y) {
    this.elem.style.top = `${y}px`;
  }

  hide() {
    this.elem.style.opacity = "0";
  }

  show() {
    this.elem.style.opacity = "1";
  }
}
