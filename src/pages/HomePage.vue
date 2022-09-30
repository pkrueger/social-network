<template>
  {{ AppState.posts }}
</template>

<script>
import { reactive } from "vue";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";

export default {
  setup() {
    const state = reactive({
      posts: AppState.posts,
    });
    return { AppState };
  },
  components: { PostCard },
};
</script>

<style scoped lang="scss"></style>
