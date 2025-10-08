import { createNodeMenuElem } from "../helpers/elementFactory.js";
import { MOUSE_ENTER, MOUSE_LEAVE, CLICK } from "../constants/events.js";
import { TreeNode } from "../structures/TreeNode.js";

export class NodeMenu {
  constructor() {
    this.html = createNodeMenuElem();
    this.selectedNode = undefined;
    this.#attachHandlers();
    this.#showAddButtons();
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
    this.#showAddButtons();
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
      delete this.selectedNode.value;
      delete this.selectedNode.right;
      delete this.selectedNode.left;
      cb?.();
    });
  }

  setClickLeft(cb) {
    const { leftButtonElem } = this.getElements();
    leftButtonElem.addEventListener(CLICK, () => {
      this.selectedNode.left = new TreeNode("");
      cb?.(this.selectedNode.left);
    });
  }

  setClickRight(cb) {
    const { rightButtonElem } = this.getElements();
    rightButtonElem.addEventListener(CLICK, () => {
      this.selectedNode.right = new TreeNode("");
      cb?.(this.selectedNode.right);
    });
  }

  #showAddButtons() {
    const { rightButtonElem, leftButtonElem } = this.getElements();
    rightButtonElem.style.opacity =
      this.selectedNode?.right?.value !== undefined ? 0 : 1;
    leftButtonElem.style.opacity =
      this.selectedNode?.left?.value !== undefined ? 0 : 1;
  }
}
