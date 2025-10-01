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
    const { deleteElem } = this.getElements();
    deleteElem.addEventListener(CLICK, () => {
      this.selectedNode.value = undefined;
      this.selectedNode.right = undefined;
      this.selectedNode.left = undefined;
      cb?.();
    });
  }

  setClickLeft(cb) {
    const { leftElem } = this.getElements();
    leftElem.addEventListener(CLICK, () => {
      this.selectedNode.left = new TreeNode(0);
      cb?.();
    });
  }

  setClickRight(cb) {
    const { rightElem } = this.getElements();
    rightElem.addEventListener(CLICK, () => {
      this.selectedNode.right = new TreeNode(0);
      cb?.();
    });
  }

  #showAddButtons() {
    const { rightElem, leftElem } = this.getElements();
    rightElem.style.opacity = this.selectedNode?.right?.value ? 0 : 1;
    leftElem.style.opacity = this.selectedNode?.left?.value ? 0 : 1;
  }
}
