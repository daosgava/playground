import { createMenuElem } from "../helpers/elementFactory.js";
import { DFS_ID, BFS_ID } from "../constants/OpMenu.js";

export class OpMenu {
  constructor(treeInstance) {
    this.treeInstance = treeInstance;
    this.operation = undefined;
    this.#createMenu();
    this.#attachHandlers();
  }

  #createMenu() {
    this.elements = createMenuElem();
  }

  getElements() {
    return this.elements;
  }

  #attachHandlers() {
    this.#handleSelectOperation();
    this.#handleClickButton();
  }

  #handleSelectOperation() {
    const { selectElem, buttonElem } = this.getElements();
    selectElem.addEventListener("change", (event) => {
      this.operation = event.target.value;
    });
  }

  #handleClickButton() {
    const { buttonElem, inputElem } = this.getElements();
    buttonElem.addEventListener("click", () => {
      this.treeInstance.resetTree();
      if (this.operation === DFS_ID) {
        this.treeInstance.dfs(this.treeInstance.root, inputElem.value);
      } else if (this.operation === BFS_ID) {
        this.treeInstance.bfs(this.treeInstance.root, inputElem.value);
      }
    });
  }
}
