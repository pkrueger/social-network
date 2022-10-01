<template>
  <PostCard v-for="p in state.posts" :key="p.id" :post="p" />
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
    });

    async function getAllPosts() {
      try {
        await postsService.getPosts();
      } catch (error) {
        Pop.error(error, "[GetAllPosts]");
      }
    }

    onMounted(() => {
      getAllPosts();
    });

    return { state };
  },
  components: { PostCard },
};
</script>

<style scoped lang="scss"></style>
