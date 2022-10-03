<template>
  <div
    class="infinite-scroll pe-1 d-flex flex-column align-items-center"
    :style="`height: calc(100vh - 5rem - ${state.awordHeight}px)`"
  >
    <PostForm class="shadow mb-5 post w-100" v-if="state.account?.id" />

    <div class="form-check mb-3 me-auto ms-4 text-primary">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="filterGraduated"
        v-model="editable.filter"
      />
      <label class="form-check-label" for="filterGraduated">
        Only Show Graduated
      </label>
    </div>

    <div v-if="editable.filter" v-for="p in state.posts" class="post w-100">
      <PostCard
        v-if="p.creator.graduated"
        :key="p.id"
        :post="p"
        class="shadow mb-5 post w-100"
      />
    </div>
    <PostCard
      v-else
      v-for="p in state.posts"
      :key="p.id"
      :post="p"
      class="shadow mb-5 post w-100"
    />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { AppState } from "../AppState.js";
import PostCard from "../components/PostCard.vue";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";
import PostForm from "../components/PostForm.vue";

export default {
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts),
      older: computed(() => AppState.olderPosts),
      account: computed(() => AppState.account),
      awordHeight: computed(() => AppState.awordHeight),
    });

    const editable = ref({});

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
        try {
          if (
            element.scrollTop + element.clientHeight >= element.scrollHeight &&
            state.older
          ) {
            await postsService.getOlderPosts(state.older);
          }
        } catch (error) {
          Pop.error(error, "GetNextPosts");
        }
      };
    }

    onMounted(() => {
      getAllPosts();
      getNextPosts();
    });

    onUnmounted(() => {
      AppState.olderPosts = "";
      AppState.posts = [];
    });

    return { state, editable };
  },
  components: { PostCard, PostForm },
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
