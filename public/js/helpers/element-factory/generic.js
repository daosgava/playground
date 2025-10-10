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
