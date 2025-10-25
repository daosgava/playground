class SubTree {
  contructor(rootNode) {
    this.rootNode = rootNode;
  }

  #createSubtree() {
    const { subTreeElem, rootElem, childrenContainerElem } =
      createSubNaryTreeElem();
    const htmlNode = new Node(this.rootNode);
    const { nodeElem } = htmlNode.getElements();
    rootElem.appendChild(nodeElem);

    this.html = { subTreeElem, childrenContainerElem, nodeElem };
  }

  #createSubTree(currentNode) {
    // Create HTML Node
    const htmlNode = new Node(currentNode, this.nodeMenu);
    const { nodeElem } = htmlNode.getElements();

    // Create Subtree
    const { subTreeElem, rootElem, leftElem, rightElem } = createSubTreeElem();
    rootElem.appendChild(nodeElem);

    return { subTreeElem, leftElem, rightElem, nodeElem };
  }

  getElements() {
    return this.html;
  }
}
