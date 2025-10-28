import { createHtmlElem } from "./tree.js";

export const createSubNaryTreeElem = (node) => {
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

  subTreeElem.appendChild(rootElem);

  if (node.getChildren().length > 0) {
    subTreeElem.appendChild(childrenContainerElem);
  }

  return { subTreeElem, rootElem, childrenContainerElem };
};
