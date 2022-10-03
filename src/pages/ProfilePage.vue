<template>
  <div class="infinite-scroll pe-1 d-flex flex-column align-items-center">
    <ProfileDetails
      :creator="state.creator"
      class="post shadow w-100"
      v-if="state.creator"
    />

    <PostForm
      class="post shadow w-100 mb-5"
      v-if="route.params.id == state.account?.id"
    />

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
import { onMounted, onUnmounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";
import ProfileDetails from "../components/ProfileDetails.vue";
import PostForm from "../components/PostForm.vue";

export default {
  watch: {
    $route(to, from) {
      if (to != from) {
        this.getPostsById();
        this.getNextPosts();
        this.getCreator();
      }
    },
  },

  setup() {
    const route = useRoute();
    const state = reactive({
      posts: computed(() => AppState.activePosts),
      older: computed(() => AppState.olderPosts),
      creator: computed(() => AppState.activeCreator),
      account: computed(() => AppState.account),
    });

    async function getPostsById() {
      try {
        await postsService.getPostsById(route.params.id);
      } catch (error) {
        Pop.error(error, "[GetPostsById]");
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
          Pop.error(error, "[GetNextPosts]");
        }
      };
    }

    async function getCreator() {
      try {
        await postsService.getCreator(route.params.id);
      } catch (error) {
        Pop.error(error, "[GetCreator]");
      }
    }

    onMounted(() => {
      getPostsById();
      getNextPosts();
      getCreator();
    });

    onUnmounted(() => {
      AppState.activePosts = [];
      AppState.activeCreator = null;
      AppState.olderPosts = "";
    });

    return { state, route, getCreator, getPostsById, getNextPosts };
  },
  components: { PostCard, ProfileDetails, PostForm },
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
</style>
