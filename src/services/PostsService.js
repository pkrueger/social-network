import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js";

class PostsService {
  async getPosts(page = 1) {
    const res = await api.get("/api/posts", {
      params: {
        page,
      },
    });
    AppState.posts = res.data.posts.map((p) => new Post(p));
    AppState.olderPosts = res.data.older;
  }
}

export const postsService = new PostsService();
