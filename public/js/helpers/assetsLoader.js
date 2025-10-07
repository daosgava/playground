export const loadAsset = ({ url, type, isScript }) => {
  const head = document.getElementsByTagName("HEAD")[0];
  const link = document.createElement(isScript ? "script" : "link");

  link.type = type;

  if (isScript) {
    link.src = url;
  } else {
    link.rel = "stylesheet";
    link.href = url;
  }

  head.appendChild(link);
};
