<template>
  <div class="card">
    <div
      class="card-header p-0 border-0 bg-white d-flex justify-content-between"
    >
      <div>
        <router-link :to="{ name: 'Profile', params: { id: post.creator.id } }">
          <div class="user-info d-flex">
            <img
              :src="post.creator.picture"
              :alt="post.creator.name"
              class="img-fluid post-profile-image"
              @error="loadDefaultImage"
            />
            <div class="user-text ms-3">
              <h5 class="card-title text-primary">{{ post.creator.name }}</h5>
              <div class="d-flex align-items-center">
                <h6
                  class="card-subtitle text-dark needs-render transparent"
                  :datetime="post.created"
                ></h6>
                <i
                  class="fa-solid fa-user-graduate text-dark transparent ms-3"
                  v-if="post.creator.graduated"
                ></i>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div>
        <i
          class="fa-solid fa-minus selectable rounded"
          @click="removePost(post.id)"
          v-if="post.creator.id == state.account?.id"
        ></i>
      </div>
    </div>
    <div class="card-body p-0">
      <p class="post-body ms-3">{{ post.body }}</p>
      <img
        :src="post.imgUrl"
        alt="Error Loading Picture"
        class="img-fluid post-image"
        @error="loadDefaultImage"
        v-if="post.imgUrl"
      />
    </div>
    <div class="card-footer text-end text-primary bg-white border-0 fs-5">
      <i
        class="fa-solid fa-heart me-1"
        @click="handleLike(post.id)"
        v-if="post.likeIds.includes(state.account.id)"
      ></i
      ><i
        class="fa-regular fa-heart me-1"
        @click="handleLike(post.id)"
        v-else
      ></i>
      <span class="transparent">{{ post.likeIds.length }}</span>
    </div>
  </div>
</template>

<script>
import { Post } from "../models/Post.js";
import { format, render, cancel, register } from "timeago.js";
import { onMounted, onUnmounted, reactive } from "vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import { postsService } from "../services/PostsService.js";

export default {
  props: {
    post: { type: Post, required: true },
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
    });

    async function handleLike(id) {
      try {
        if (state.account.id) {
          await accountService.handleLike(id);
        } else {
          Pop.toast("You need to be logged in to like posts.");
        }
      } catch (error) {
        Pop.error(error, ["HandleLike"]);
      }
    }

    async function removePost(id) {
      try {
        if (await Pop.confirm("Remove Post?")) {
          await postsService.removePost(id);
        }
      } catch (error) {
        Pop.error(error, "[RemovePost]");
      }
    }

    onMounted(() => {
      const nodes = document.querySelectorAll(".needs-render");
      render(nodes, "en_US");

      const renderInterval = setInterval(() => {
        render(nodes, "en_US");
      }, 60000);
      state.renderInterval = renderInterval;
    });

    onUnmounted(() => {
      clearInterval(state.renderInterval);
    });
    return {
      state,
      handleLike,
      removePost,
      loadDefaultImage(event) {
        event.target.src = "src/assets/img/undraw-dog.png";
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.post-profile-image {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  object-fit: cover;
}

.user-info {
  padding: 1rem 1rem 0;
}

.transparent {
  opacity: 0.5;
}

.post-body {
  padding: 1rem 1rem 0;
  margin: 0;
}

.post-image {
  width: 100%;
  margin: 1rem 0 0.5rem;
}

.card-footer {
  padding: 0 1rem 0.5rem;
}

.fa-heart {
  transition: filter 100ms linear;
}

.fa-heart:hover {
  cursor: pointer;
  filter: brightness(200%);
}

.fa-heart:active {
  filter: brightness(90%);
}

.fa-minus {
  padding: 0.25rem;
  margin: 0.75rem;
}
</style>
