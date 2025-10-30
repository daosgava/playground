import { MOUSE_ENTER, MOUSE_LEAVE, CLICK } from "../../constants/events.js";

export class NodeMenu {
  #html = undefined;
  #selectedNode = undefined;
  constructor(createNodeMenuElem) {
    this.#html = createNodeMenuElem();
    this.#attachHandlers();
  }

  setSelected(node) {
    this.#selectedNode = node;
  }

  getSelected() {
    return this.#selectedNode;
  }

  getElements() {
    return this.#html;
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
    const { deleteButtonElem } = this.getElements();
    deleteButtonElem.addEventListener(CLICK, () => {
      this.hide();
      this.setX(0);
      this.setY(0);
      cb?.();
    });
  }
}
