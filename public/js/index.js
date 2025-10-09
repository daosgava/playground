import { loadAsset } from "./helpers/assetsLoader.js";

const loadStyles = () => {
  const styles = [
    "./css/global.css",
    "./css/tree.css",
    "./css/nodeMenu.css",
    "./css/node.css",
    "./css/connector.css",
    "./css/menu.css",
  ];
  styles.forEach((url) =>
    loadAsset({ url, type: "text/css", isScript: false }),
  );
};

const loadScripts = () => {
  const scripts = ["./js/app.js"];
  scripts.forEach((url) => loadAsset({ url, type: "module", isScript: true }));
};

const main = () => {
  loadStyles();
  loadScripts();
};

main();
