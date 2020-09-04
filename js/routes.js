import PostPage from "../pages/postPage.js";
import PostDetailPage from "../pages/postDetailPage.js";

export default {
  post: {
    path: "/#/post-list",
    component: PostPage,
  },
  postDetail: {
    path: "/#/post-detail",
    component: PostDetailPage,
  },
};
