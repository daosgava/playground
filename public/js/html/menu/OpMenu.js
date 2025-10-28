import { createMenuElem } from "../../helpers/element-factory/menuOp.js";
import {
  DFS_ID,
  BFS_ID,
  INVERT_ID,
  INVERT_ICON,
  SEARCH_ICON,
} from "../../constants/OpMenu.js";

export class OpMenu {
  constructor(treeInstance, appContainer) {
    this.appContainer = appContainer;
    this.treeInstance = treeInstance;
    this.operation = DFS_ID;
    this.#createMenu();
    this.#attachHandlers();
    this.#addToPage();
  }

  #createMenu() {
    this.elements = createMenuElem();
  }

  #addToPage() {
    const { containerElem } = this.getElements();
    this.appContainer.appendChild(containerElem);
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
      this.operation = event.target.value;

      inputElem.style.display = this.operation === INVERT_ID ? "none" : "block";
      buttonElem.innerText =
        this.operation === INVERT_ID ? INVERT_ICON : SEARCH_ICON;
    });
  }

  #handleClickButton() {
    const { buttonElem, inputElem } = this.getElements();
    buttonElem.addEventListener("click", () => {
      if (this.operation === DFS_ID) {
        this.treeInstance.dfs(this.treeInstance.root, inputElem.value);
      } else if (this.operation === BFS_ID) {
        this.treeInstance.bfs(this.treeInstance.root, inputElem.value);
      } else if (this.operation === INVERT_ID) {
        this.treeInstance.invert(this.treeInstance.root);
      }
    });
  }
}
