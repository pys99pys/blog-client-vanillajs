import { map, timeFormat } from "../js/utils.js";
import { getPost } from "../js/api.js";

const postDetailPage = async () => {
  const id = window.location.href.split("/").pop();
  const post = await getPost(id);
  if (!post) return "";

  const { tags, subject, description, content, createdAt } = post;

  return `
    <div class="content">
      <div class="post-detail-page">
        <div class="post-detail-page__header">
          <div class="tags">
            ${map(
              tags,
              (tag) => `
                <span>${tag}</span>
              `
            )}
          </div>
          <h1>${subject}</h1>
          <time>${timeFormat(createdAt)}</time>
        </div>
        <div class="post-detail-page__content">${marked(content)}</div>
      </div>
    </div>
  `;
};

export default postDetailPage;
