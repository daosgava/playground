import { createNodeMenuElem } from "../helpers/elementFactory.js";
import { MOUSE_ENTER, MOUSE_LEAVE, CLICK } from "../constants/events.js";

export class NodeMenu {
  constructor() {
    this.html = createNodeMenuElem();
    this.selectedNode = undefined;
    this.#attachHandlers();
  }

  getElements() {
    return this.html;
  }

  setX(x) {
    const { menuElem } = this.getElements();
    menuElem.style.left = `${x}px`;
  }

  setY(y) {
    const { menuElem } = this.getElements();
    menuElem.style.top = `${y}px`;
  }

  hide() {
    const { menuElem } = this.getElements();
    menuElem.style.opacity = "0";
  }

  show() {
    const { menuElem } = this.getElements();
    menuElem.style.opacity = "1";
  }

  #attachHandlers() {
    this.setMouseEnter();
    this.setMouseLeave();
    this.setClickDelete();
  }

  setMouseEnter(cb) {
    const { menuElem } = this.getElements();
    menuElem.addEventListener(MOUSE_ENTER, () => {
      this.show();
      cb?.();
    });
  }

  setMouseLeave(cb) {
    const { menuElem } = this.getElements();
    menuElem.addEventListener(MOUSE_LEAVE, () => {
      this.hide();
      cb?.();
    });
  }

  setClickDelete(cb) {
    const { deleteElem } = this.getElements();
    deleteElem.addEventListener(CLICK, () => {
      this.selectedNode.value = undefined;
      cb?.();
    });
  }
}
