import { reactive, ref } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},

  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Aword.js').Aword[]} */
  awords: [],

  /** @type {import('./models/Post.js').Post[]} */
  posts: [],

  /** @type {import('./models/Post.js').Post[]} */
  activePosts: [],

  /** @type {import('./models/Account.js').Account | null} */
  activeCreator: null,

  /** @type {import('./models/Post.js').Post} */
  profiles: [],

  olderPosts: "",
  page: 1,

  screenWidth: window.innerWidth,
});
