<template>
  <div class="card">
    <div class="card-body p-0">
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
      <p class="post-body">{{ post.body }}</p>
      <img
        :src="post.imgUrl"
        alt="Error Loading"
        class="img-fluid post-image"
        v-if="post.imgUrl"
      />
    </div>
    <div class="card-footer text-end text-primary bg-white border-0 fs-5">
      <i
        class="fa-solid fa-heart"
        v-if="post.likeIds.includes(state.account.id)"
      ></i
      ><i class="fa-regular fa-heart me-1" v-else></i>
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

export default {
  props: {
    post: { type: Post, required: true },
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
    });

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
</style>
