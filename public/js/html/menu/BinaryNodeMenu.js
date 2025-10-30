import { createNodeMenuElem } from "../../helpers/element-factory/nodeMenu.js";
import { CLICK } from "../../constants/events.js";
import { NodeMenu } from "./NodeMenu.js";

export class BinaryNodeMenu extends NodeMenu {
  constructor() {
    super(createNodeMenuElem);
  }

  show() {
    super.show();
    this.#showAddButtons();
  }

  setClickLeft(cb) {
    const { leftButtonElem } = this.getElements();
    leftButtonElem.addEventListener(CLICK, () => {
      this.hide();
      this.setX(0);
      this.setY(0);
      cb?.();
    });
  }

  setClickRight(cb) {
    const { rightButtonElem } = this.getElements();
    rightButtonElem.addEventListener(CLICK, () => {
      this.hide();
      this.setX(0);
      this.setY(0);
      cb?.();
    });
  }

  #showAddButtons() {
    const { rightButtonElem, leftButtonElem } = this.getElements();
    const selectedNode = this.getSelected();

    rightButtonElem.style.opacity =
      selectedNode?.getRight() !== undefined ? 0 : 1;
    leftButtonElem.style.opacity =
      selectedNode?.getLeft() !== undefined ? 0 : 1;
  }
}
