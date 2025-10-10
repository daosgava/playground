import { OPTIONS, SEARCH_ICON } from "../../constants/OpMenu.js";

export const createHtmlElem = ({ tag, classes, id, innerText, value }) => {
  const elem = document.createElement(tag);
  classes?.forEach((cssClass) => elem.classList.add(cssClass));

  if (id) {
    elem.id = id;
  }

  if (innerText) {
    elem.innerText = innerText;
  }

  if (value) {
    elem.value = value;
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

export const createConnectorElem = () => {
  const connectorElem = createHtmlElem({ tag: "div", classes: ["connector"] });

  return { connectorElem };
};

export const createSelectElem = ({ id, options }) => {
  const selectElem = createHtmlElem({ tag: "select", id });
  options.forEach((option) => {
    const optionElem = createHtmlElem({
      tag: "option",
      id: option.id,
      value: option.value,
      innerText: option.text,
    });
    selectElem.appendChild(optionElem);
  });

  return { selectElem };
};

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
