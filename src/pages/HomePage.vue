<template>
  <div class="infinite-scroll pe-1 d-flex flex-column align-items-center">
    <PostCard
      v-for="p in state.posts"
      :key="p.id"
      :post="p"
      class="shadow mb-5 post w-100"
    />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, reactive } from "vue";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts),
      older: computed(() => AppState.olderPosts),
    });

    async function getAllPosts() {
      try {
        await postsService.getPosts();
      } catch (error) {
        Pop.error(error, "[GetAllPosts]");
      }
    }

    function getNextPosts() {
      const element = document.querySelector(".infinite-scroll");
      element.onscroll = async (event) => {
        if (
          element.scrollTop + element.clientHeight >= element.scrollHeight &&
          state.older
        ) {
          console.log("hello");
          await postsService.getOlderPosts(state.older);
        }
      };
    }

    onMounted(async () => {
      await getAllPosts();
      getNextPosts();
    });

    return { state };
  },
  components: { PostCard },
};
</script>

<style scoped lang="scss">
.infinite-scroll {
  margin-top: 1rem;
  overflow: auto;
  height: calc(100vh - 4.5rem);
}

.post {
  max-width: 50rem;
}
</style>
