import { createMenuElem } from "../helpers/elementFactory.js";

export class OpMenu {
  constructor() {
    this.#createMenu();
  }

  #createMenu() {
    this.elements = createMenuElem();
  }

  getElements() {
    return this.elements;
  }
}
