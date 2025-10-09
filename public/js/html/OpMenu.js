import { createMenuElem } from "../helpers/elementFactory.js";
import { DFS_ID, BFS_ID } from "../constants/OpMenu.js";

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
    const { selectElem } = this.getElements();
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
