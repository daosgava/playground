import { createHtmlElem } from "./generic.js";

export const createNodeMenuElem = () => {
  const menuElem = createHtmlElem({ tag: "div", classes: ["node-menu"] });
  const leftButtonElem = createHtmlElem({ tag: "div", classes: ["button"] });
  const deleteButtonElem = createHtmlElem({
    tag: "div",
    classes: ["button"],
  });
  const rightButtonElem = createHtmlElem({
    tag: "div",
    classes: ["button"],
  });

  const rightArrowElem = createHtmlElem({
    tag: "div",
    classes: ["arrow", "right"],
  });
  const leftArrowElem = createHtmlElem({
    tag: "div",
    classes: ["arrow", "left"],
  });
  const deleteArrowElem = createHtmlElem({
    tag: "div",
    classes: ["arrow", "delete"],
  });

  leftButtonElem.appendChild(leftArrowElem);
  rightButtonElem.appendChild(rightArrowElem);
  deleteButtonElem.appendChild(deleteArrowElem);

  menuElem.appendChild(leftButtonElem);
  menuElem.appendChild(deleteButtonElem);
  menuElem.appendChild(rightButtonElem);

  return { menuElem, leftButtonElem, rightButtonElem, deleteButtonElem };
};
