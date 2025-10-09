export const createHtmlElem = ({ tag, classes, id, innerText, value }) => {
  const elem = document.createElement(tag);
  classes?.forEach((cssClass) => elem.classList.add(cssClass));

  if (id) {
    elem.id = id;
  }

  if (innerText) {
    elem.innerText = innerText;
  }

  return elem;
};

export const createInputElem = ({ classes, id, value, placeholder }) => {
  const inputElem = createHtmlElem({ tag: "input", classes, id });

  inputElem.value = value;
  inputElem.placeholder = placeholder;

  return inputElem;
};

export const createNodeElem = (node) => {
  const nodeElem = createInputElem({
    id: `node-${node.id}`,
    classes: ["node"],
    value: node.value,
    placeholder: "∞",
  });

  nodeElem.style.anchorName = `--node-${node.id}`;

  return { nodeElem };
};

export const createSubTreeElem = () => {
  const subTreeElem = createHtmlElem({
    tag: "div",
    classes: ["node-container"],
  });

  const rootElem = createHtmlElem({
    tag: "div",
    classes: ["root"],
  });

  const childrenContainerElem = createHtmlElem({
    tag: "div",
    classes: ["children-container"],
  });

  const leftElem = createHtmlElem({
    tag: "div",
    classes: ["child", "left"],
  });

  const rightElem = createHtmlElem({
    tag: "div",
    classes: ["child", "right"],
  });

  childrenContainerElem.appendChild(leftElem);
  childrenContainerElem.appendChild(rightElem);

  subTreeElem.appendChild(rootElem);
  subTreeElem.appendChild(childrenContainerElem);

  return { subTreeElem, rootElem, leftElem, rightElem };
};

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

export const createConnectorElem = () => {
  const connectorElem = createHtmlElem({ tag: "div", classes: ["connector"] });

  return { connectorElem };
};

export const createMenuElem = () => {
  const containerElem = createHtmlElem({ tag: "div", id: "menu" });
  const inputElem = createInputElem({
    id: "target",
    value: "",
    placeholder: "Search number",
  });
  const buttonElem = createHtmlElem({
    tag: "button",
    id: "search",
    innerText: "🔍",
  });

  containerElem.appendChild(inputElem);
  containerElem.appendChild(buttonElem);

  return {
    containerElem,
    inputElem,
    buttonElem,
  };
};
