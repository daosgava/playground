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
  if (node.left || node.right) {
    const separator = createHtmlElem("div", ["separator"]);
    const vline = createHtmlElem("div", ["vline"]);
    const hline = createHtmlElem("div", ["hline"]);
    separator.appendChild(vline);
    separator.appendChild(hline);
    nodeElem.appendChild(separator);
  }
};

const drawNode = (node, htmlContainer) => {
  const nodeElem = appendNodeToPage(htmlContainer, node);
  addSeparator(nodeElem, node);

  return nodeElem;
};

// Based on Depth-First
export const depthFirst = (node, htmlContainer, level = 0) => {
  if (!node?.value) return false;

  node.level = level;
  const nextLevel = level + 1;

  const nodeElem = drawNode(node, htmlContainer);

  return (
    depthFirst(node.left, nodeElem, nextLevel) ||
    depthFirst(node.right, nodeElem, nextLevel)
  );
};
