import {
  createHtmlElem,
  createInputElem,
  createSelectElem,
} from "./generic.js";
import { OPTIONS, SEARCH_ICON } from "../../constants/OpMenu.js";

export const createMenuElem = () => {
  const menuElem = createHtmlElem({ tag: "div", id: "menu" });
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

  menuElem.appendChild(selectElem);
  menuElem.appendChild(inputElem);
  menuElem.appendChild(buttonElem);

  return {
    menuElem,
    inputElem,
    buttonElem,
    selectElem,
  };
};
