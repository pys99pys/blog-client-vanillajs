import { map, timeFormat } from "../js/utils.js";
import routes from "../js/routes.js";
import { getPosts } from "../js/api.js";

const PER_BLOCK = 10;
const postPage = async () => {
  try {
    const currentTag = window.location.href
      .split(routes.post.path)
      .pop()
      .replace("/", "");

    const currentPage = window.location.search.split("page=");

    console.log(currentPage);

    const { meta, data } = await getPosts(currentTag);

    const handlePage = (nextPage) => {
      window.location.href = window.location.pathname;
    };

    const $root = document.createElement("div");
    $root.classList.add("post-page");

    const $items = document.createElement("div");
    $items.classList.add("post-page__items");

    data.forEach(({ id, tags, subject, description, createdAt }) => {
      const $article = document.createElement("article");

      const $a = document.createElement("a");
      $a.href = `${routes.postDetail.path}/${id}`;

      const $tags = document.createElement("div");
      tags.split(",").forEach((tag) => {
        const $span = document.createElement("span");
        $span.innerText = tag;
        $tags.appendChild($span);
      });
      $tags.classList.add("tags");
      $a.appendChild($tags);

      const $h1 = document.createElement("h1");
      $h1.innerText = subject;
      $a.appendChild($h1);

      if (!!description) {
        const $p = document.createElement("p");
        $p.innerText = description;
        $a.appendChild($p);
      }

      const $time = document.createElement("time");
      $time.innerText = timeFormat(createdAt);
      $a.appendChild($time);

      $article.appendChild($a);
      $items.appendChild($article);
    });

    $root.appendChild($items);

    const $pagination = document.createElement("ul");
    $pagination.classList.add("post-page__pagination");

    const endPage = Math.ceil(meta.itemCount / meta.perPage);
    const currentBlock = Math.ceil(meta.currentPage / PER_BLOCK);
    const startBlock = Math.max((currentBlock - 1) * PER_BLOCK + 1, 1);
    const endBlock = Math.min(currentBlock * PER_BLOCK, endPage);

    for (let i = startBlock; i <= endBlock; i++) {
      const $li = document.createElement("li");
      const $a = document.createElement("a");
      $a.onclick = () => handlePage(i);
      $a.innerText = i;

      $li.appendChild($a);
      $pagination.appendChild($li);
    }

    $root.appendChild($pagination);

    return $root;
  } catch (e) {
    console.error(e);
    return "";
  }
};

export default postPage;
