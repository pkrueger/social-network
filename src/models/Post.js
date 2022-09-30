import { Account } from "./Account.js";

export class Post {
  constructor(data) {
    this.id = data.id;
    this.body = data.body;
    this.imgUrl = data.imgUrl;
    this.likeIds = data.likeIds;
    this.created = data.createdAt;
    this.updated = data.updatedAt;
    this.creator = new Account(data.creator);
    this.likes = data.likes;
  }
}
