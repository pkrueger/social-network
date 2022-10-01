import { AppState } from "../AppState.js";
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
}

export const postsService = new PostsService();
