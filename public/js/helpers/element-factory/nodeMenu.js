import { createHtmlElem } from "./generic.js";

export const createNodeMenuElem = () => {
  const menuElem = createHtmlElem({
    tag: "div",
    classes: ["node-menu", "binary"],
  });
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

export const createNaryNodeMenuElem = () => {
  const menuElem = createHtmlElem({
    tag: "div",
    classes: ["node-menu", "nary"],
  });

  const deleteButtonElem = createHtmlElem({
    tag: "div",
    classes: ["button"],
  });
  const deleteArrowElem = createHtmlElem({
    tag: "div",
    classes: ["arrow", "delete"],
  });

  deleteButtonElem.appendChild(deleteArrowElem);

  const addChildButtonElem = createHtmlElem({
    tag: "div",
    classes: ["button"],
  });
  const addChildIcon = createHtmlElem({
    tag: "div",
    classes: ["add"],
    innerText: "+",
  });

  addChildButtonElem.appendChild(addChildIcon);

  menuElem.appendChild(deleteButtonElem);
  menuElem.appendChild(addChildButtonElem);

  return { menuElem, addChildButtonElem, deleteButtonElem };
};
