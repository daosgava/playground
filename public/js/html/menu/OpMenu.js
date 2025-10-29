import { createMenuElem } from "../../helpers/element-factory/menuOp.js";
import {
  DFS_ID,
  BFS_ID,
  INVERT_ID,
  INVERT_ICON,
  SEARCH_ICON,
} from "../../constants/OpMenu.js";

export class OpMenu {
  #treeInstances = [];
  #operation = DFS_ID;
  constructor(arrInstances) {
    this.#treeInstances = arrInstances;
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
    const { selectElem, inputElem, buttonElem } = this.getElements();
    selectElem.addEventListener("change", (event) => {
      this.#operation = event.target.value;

      inputElem.style.display =
        this.#operation === INVERT_ID ? "none" : "block";
      buttonElem.innerText =
        this.#operation === INVERT_ID ? INVERT_ICON : SEARCH_ICON;
    });
  }

  #handleClickButton() {
    const { buttonElem, inputElem } = this.getElements();
    buttonElem.addEventListener("click", () => {
      this.#treeInstances.forEach((tree) => {
        tree.resetTree();
        if (this.#operation === DFS_ID) {
          tree.dfs(tree.root, inputElem.value);
        } else if (this.#operation === BFS_ID) {
          tree.bfs(tree.root, inputElem.value);
        } else if (this.#operation === INVERT_ID) {
          tree.invert();
        }
      });
    });
  }
}
