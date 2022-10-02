<template>
  <div class="infinite-scroll pe-1 d-flex flex-column align-items-center">
    <h3 class="transparent text-primary mb-3">
      Searching for "{{ route.query.query }}"
    </h3>

    <PostCard
      v-for="p in state.posts"
      :key="p.id"
      :post="p"
      class="shadow mb-5 post w-100"
    />
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated, reactive } from "vue";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";
import PostCard from "../components/PostCard.vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";

export default {
  watch: {
    $route(to, from) {
      if (to != from) {
        this.getSearchResults();
        this.getNextPosts();
      }
    },
  },

  setup() {
    const state = reactive({
      posts: computed(() => AppState.activePosts),
      profiles: computed(() => AppState.profiles),
      older: computed(() => AppState.olderPosts),
    });
    const route = useRoute();

    async function getSearchResults() {
      try {
        await postsService.getSearchResults(route.query.query);
      } catch (error) {
        Pop.error(error, "[GetSearchResults]");
      }
    }

    function getNextPosts() {
      const element = document.querySelector(".infinite-scroll");
      element.onscroll = async (event) => {
        try {
          if (
            element.scrollTop + element.clientHeight >= element.scrollHeight &&
            state.older
          ) {
            console.log("hello");
            await postsService.getOlderActivePosts(state.older);
          }
        } catch (error) {
          Pop.error(error, "GetNextPosts");
        }
      };
    }

    onMounted(() => {
      getSearchResults();
      getNextPosts();
    });

    onUnmounted(() => {
      AppState.olderPosts = "";
      AppState.activePosts = [];
      AppState.profiles = [];
    });

    return { state, route, getSearchResults, getNextPosts };
  },
  components: { PostCard },
};
</script>

<style lang="scss" scoped>
.infinite-scroll {
  margin-top: 1rem;
  overflow: auto;
  height: calc(100vh - 4.5rem);
}

.post {
  max-width: 50rem;
}

.transparent {
  opacity: 0.5;
}
</style>
