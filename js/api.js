import { getEnv } from "./utils.js";

const API_HOST = (() => {
  return getEnv() === "production"
    ? "https://blog-api.pys99pys.com"
    : "http://localhost:3000";
})();

const apiCreator = (api) =>
  new Promise((resolve, reject) => {
    fetch(API_HOST + api)
      .then((response) => {
        if (response.status !== 200) reject(response);
        resolve(response.json());
      })
      .catch((e) => {
        reject(e);
      });
  });

export const getPosts = async (tag) => {
  try {
    return await apiCreator(`/posts/1/${tag}`);
  } catch (e) {
    throw new Erros("fail to fetch");
  }
};

export const getPost = async (id) => {
  try {
    return await apiCreator(`/post/${id}`);
  } catch (e) {
    throw new Erros("fail to fetch");
  }
};

export const getTags = async () => {
  try {
    return await apiCreator(`/tags`);
  } catch (e) {
    throw new Erros("fail to fetch");
  }
};
