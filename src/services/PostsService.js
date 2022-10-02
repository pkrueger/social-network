import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js";

class PostsService {
  async getPosts() {
    const res = await api.get("/api/posts");
    AppState.posts = res.data.posts.map((p) => new Post(p));
    AppState.olderPosts = res.data.older;
  }

  async getOlderPosts(url) {
    const res = await api.get(url);
    for (let post of res.data.posts) {
      AppState.posts.push(new Post(post));
    }
    AppState.olderPosts = res.data.older;
  }

  async getPostsById(id) {
    const res = await api.get(`/api/profiles/${id}/posts`);
    AppState.activePosts = res.data.posts.map((p) => new Post(p));
    AppState.olderPosts = res.data.older;
  }

  async getOlderActivePosts(url) {
    const res = await api.get(url);
    for (let post of res.data.posts) {
      AppState.activePosts.push(new Post(post));
    }
    AppState.olderPosts = res.data.older;
  }

  async getCreator(id) {
    const res = await api.get(`/api/profiles/${id}`);
    AppState.activeCreator = new Account(res.data);
  }

  async getSearchResults(query) {
    const res = await api.get("/api/profiles", {
      params: { query },
    });

    const r = await api.get("/api/posts", {
      params: { query },
    });

    // console.log(res.data, r.data);
    AppState.profiles = res.data.map((a) => new Account(a));
    AppState.activePosts = r.data.posts.map((p) => new Post(p));
    AppState.olderPosts = r.data.older;
  }
}

export const postsService = new PostsService();
