import routes from "./routes.js";
import { map } from "./utils.js";

export default class Renderer {
  constructor() {
    this.renderLayout();
  }

  async renderPage(component) {
    const $main = document.getElementsByClassName("main")[0];
    const $pageNode = await component();
    $main.append($pageNode);
  }

  renderLayout() {
    document.getElementById("root").innerHTML = `
      <header class="header">
        <span class="header__logo"><a href="${routes.post.path}">ys.log</a></span>
      </header>
      <main class="main"></main>
      <footer class="footer">pys99pys's tech blog</footer>
    `;
  }

  move(component) {
    this.renderPage(component);
  }
}
