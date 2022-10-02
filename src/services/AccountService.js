import { AppState } from "../AppState";
import { Account } from "../models/Account.js";
import { Post } from "../models/Post.js";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class AccountService {
  async getAccount() {
    try {
      const res = await api.get("/account");
      AppState.account = new Account(res.data);
    } catch (err) {
      logger.error("HAVE YOU STARTED YOUR SERVER YET???", err);
    }
  }

  async handleLike(id) {
    const res = await api.post(`/api/posts/${id}/like`);
    if (AppState.activePosts.length) {
      AppState.activePosts.splice(
        AppState.activePosts.findIndex((p) => p.id == id),
        1,
        new Post(res.data)
      );
    } else {
      AppState.posts.splice(
        AppState.posts.findIndex((p) => p.id == id),
        1,
        new Post(res.data)
      );
    }
  }
}

export const accountService = new AccountService();
