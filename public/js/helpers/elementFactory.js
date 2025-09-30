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
  const nodeContainerElem = createHtmlElem({
    tag: "div",
    classes: ["node-container"],
  });

  nodeContainerElem.appendChild(nodeElem);

  return { nodeElem, nodeContainerElem };
};

export const createNodeMenuElem = () => {
  const containerElem = createHtmlElem({ tag: "div", classes: ["node-menu"] });
  const leftElem = createHtmlElem({ tag: "div", classes: ["add-left"] });
  const rightElem = createHtmlElem({ tag: "div", classes: ["add-right"] });

  leftElem.innerText = "Add Left";
  rightElem.innerText = "Add Right";

  containerElem.appendChild(leftElem);
  containerElem.appendChild(rightElem);

  return containerElem;
};
