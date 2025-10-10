import {
  createHtmlElem,
  createInputElem,
  createSelectElem,
} from "./generic.js";
import { OPTIONS, SEARCH_ICON } from "../../constants/OpMenu.js";

export const createMenuElem = () => {
  const containerElem = createHtmlElem({ tag: "div", id: "menu" });
  const { selectElem } = createSelectElem({
    id: "operation",
    options: OPTIONS,
  });
  const inputElem = createInputElem({
    id: "target",
    value: "",
    placeholder: "Search Node",
  });
  const buttonElem = createHtmlElem({
    tag: "button",
    id: "search",
    innerText: SEARCH_ICON,
  });

  containerElem.appendChild(selectElem);
  containerElem.appendChild(inputElem);
  containerElem.appendChild(buttonElem);

  return {
    containerElem,
    inputElem,
    buttonElem,
    selectElem,
  };
};
