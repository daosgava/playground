import { LETT_BUTTON, RIGHT_BUTTON, DELETE_BUTTON } from "../constants/menu.js";

export const createHtmlElem = ({ tag, classes, id, innerText }) => {
  const elem = document.createElement(tag);
  classes.forEach((cssClass) => elem.classList.add(cssClass));

  if (id) {
    elem.id = id;
  }

  if (innerText) {
    elem.innerText = innerText;
  }

  return elem;
};

export const createInputElem = ({ classes, id, value }) => {
  const inputElem = createHtmlElem({ tag: "input", classes, id });

  inputElem.value = value;

  return inputElem;
};

export const createNodeElem = (node) => {
  const nodeElem = createInputElem({
    id: `node-${node.value}`,
    classes: ["node"],
    value: node.value,
  });

  return { nodeElem };
};

export const createSubTreeElem = (nodeElem) => {
  const subTreeElem = createHtmlElem({
    tag: "div",
    classes: ["node-container"],
  });

  const childrenContainerElem = createHtmlElem({
    tag: "div",
    classes: ["children-container"],
  });

  subTreeElem.appendChild(nodeElem);
  subTreeElem.appendChild(childrenContainerElem);

  return { nodeElem, subTreeElem, childrenContainerElem };
};

export const createNodeMenuElem = () => {
  const menuElem = createHtmlElem({ tag: "div", classes: ["node-menu"] });
  const leftElem = createHtmlElem({ tag: "div", classes: ["add-left"] });
  const deleteElem = createHtmlElem({ tag: "div", classes: ["delete-node"] });
  const rightElem = createHtmlElem({ tag: "div", classes: ["add-right"] });

  leftElem.innerText = LETT_BUTTON;
  rightElem.innerText = RIGHT_BUTTON;
  deleteElem.innerText = DELETE_BUTTON;

  menuElem.appendChild(leftElem);
  menuElem.appendChild(deleteElem);
  menuElem.appendChild(rightElem);

  return { menuElem, leftElem, rightElem, deleteElem };
};

export const createSeparatorElem = () => {
  const separator = createHtmlElem({ tag: "div", classes: ["separator"] });
  const vline = createHtmlElem({ tag: "div", classes: ["vline"] });
  const hline = createHtmlElem({ tag: "div", classes: ["hline"] });

  return { separator, vline, hline };
};
