"use strict";

import Renderer from "./Renderer.js";
import routes from "./routes.js";

(async () => {
  const getRouteKey = (href) => {
    const [, pathname] = href.split("#");
    if (!pathname) return null;

    const [, depth1] = pathname.split("/");
    return (
      Object.keys(routes).filter(
        (key) => routes[key].path === `/#/${depth1}`
      )[0] || null
    );
  };

  const redirect = () => {
    window.location.href = routes.post.path;
    window.location.reload();
  };

  const defaultRouteKey = getRouteKey(window.location.href);
  if (!Object.keys(routes).includes(defaultRouteKey)) {
    redirect();
    return;
  }

  const renderer = new Renderer();
  renderer.move(routes[defaultRouteKey].component);

  window.addEventListener("hashchange", (e) => {
    const newRouteKey = getRouteKey(e.newURL);
    const newRoute = routes[newRouteKey];
    if (!newRoute) redirect();

    renderer.move(newRoute.component);
    window.scrollTo(0, 0);
  });
})();
