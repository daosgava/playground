const createHtmlElem = (tag, cssClasses) => {
  const elem = document.createElement(tag);
  cssClasses.forEach((cssClass) => elem.classList.add(cssClass));

  return elem;
};

const createNodeContainer = (node) => {
  const nodeElem = createHtmlElem("div", ["node"]);
  const valueElem = createHtmlElem("div", ["value"]);
  valueElem.innerText = node.value;

  const valueContainerElem = createHtmlElem("div", ["value-container"]);

  valueContainerElem.appendChild(valueElem);
  nodeElem.appendChild(valueContainerElem);

  return nodeElem;
};

const appendNodeToPage = (targetContainer, node) => {
  const nodeElem = createNodeContainer(node);
  targetContainer.appendChild(nodeElem);
  targetContainer.classList.add("parent");

  return nodeElem;
};

const addSeparator = (nodeElem, node) => {
  const separator = createHtmlElem("div", ["separator"]);

  if (node.left || node.right) {
    const vline = createHtmlElem("div", ["vline"]);
    separator.appendChild(vline);
  }

  if (node.left && node.right) {
    const hline = createHtmlElem("div", ["hline"]);
    separator.appendChild(hline);
  }

  nodeElem.appendChild(separator);
};

const drawNode = (node, htmlContainer) => {
  const nodeElem = appendNodeToPage(htmlContainer, node);
  addSeparator(nodeElem, node);

  return nodeElem;
};

const assignLevel = (node, level) => {
  node.level = level;

  return level + 1;
};

// Based on Depth-First
export const drawDF = (node, htmlContainer, level = 0) => {
  if (!node?.value) return false;

  const nextLevel = assignLevel(node, level);
  const nodeElem = drawNode(node, htmlContainer);

  return (
    drawDF(node.left, nodeElem, nextLevel) ||
    drawDF(node.right, nodeElem, nextLevel)
  );
};
