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
