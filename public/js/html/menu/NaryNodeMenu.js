import { NodeMenu } from "./NodeMenu.js";
import { createNaryNodeMenuElem } from "../../helpers/element-factory/nodeMenu.js";
import { CLICK } from "../../constants/events.js";

export class NaryNodeMenu extends NodeMenu {
  constructor() {
    super(createNaryNodeMenuElem);
  }

  setClickAdd(cb) {
    const { addChildButtonElem } = this.getElements();
    addChildButtonElem.addEventListener(CLICK, () => {
      this.hide();
      this.setX(0);
      this.setY(0);
      cb?.();
    });
  }
}
