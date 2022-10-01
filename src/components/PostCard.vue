<template>
  <div class="card">
    <div class="card-body">
      <div class="user-info d-flex">
        <img
          :src="post.creator.picture"
          :alt="post.creator.name"
          class="img-fluid post-profile-image"
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
    </div>
  </div>
</template>

<script>
import { Post } from "../models/Post.js";
import { format, render, cancel, register } from "timeago.js";
import { onMounted, onUnmounted, reactive } from "vue";

export default {
  props: {
    post: { type: Post, required: true },
  },
  setup() {
    const state = reactive({});

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
    return { state };
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

.transparent {
  opacity: 0.4;
}
</style>
