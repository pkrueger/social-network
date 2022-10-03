<template>
  <div
    class="infinite-scroll pe-1 d-flex flex-column align-items-center"
    :style="`height: calc(100vh - 5rem - ${state.awordHeight}px)`"
  >
    <h3 class="transparent text-primary mb-4">
      Results for "{{ route.query.query }}"
    </h3>

    <div class="form-check text-primary">
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

    <div>
      <h1 class="text-primary mb-4 ms-4">People</h1>
      <div class="container-fluid">
        <div class="row post">
          <div
            class="col-sm-6"
            v-if="editable.filter"
            v-for="profile in state.profiles"
          >
            <ProfileSearchCard
              v-if="profile.graduated"
              :key="profile.id"
              :creator="profile"
              class="shadow mb-5 post w-100"
            />
          </div>
          <div class="col-sm-6" v-else v-for="profile in state.profiles">
            <ProfileSearchCard
              :key="profile.id"
              :creator="profile"
              class="shadow mb-5 post w-100"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <h1 class="text-primary mb-4 ms-4">Posts</h1>
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
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";
import PostCard from "../components/PostCard.vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import ProfileSearchCard from "../components/ProfileSearchCard.vue";

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
      awordHeight: computed(() => AppState.awordHeight),
    });
    const route = useRoute();
    const editable = ref({});

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

    return { state, route, editable, getSearchResults, getNextPosts };
  },
  components: { PostCard, ProfileSearchCard },
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
