<template>
  <div class="card p-0 mb-5">
    <div
      class="card-header border-0"
      :style="`background-image: url(${creator.coverImg})`"
    >
      <img
        :src="creator.picture"
        :alt="creator.name"
        class="img-fluid profile-image"
        @error="loadDefaultImage"
      />
    </div>

    <div
      :class="`card-body bg-primary ${
        creator.id == state.account?.id ? '' : 'rounded-bottom'
      }`"
    >
      <div class="d-flex justify-content-between">
        <div class="text-light profile-card-text">
          <div class="d-flex align-items-center">
            <p class="mb-0 transparent fs-6" v-if="creator.class">
              {{ creator.class }}
            </p>
            <i
              class="fa-solid fa-user-graduate transparent ms-3"
              v-if="creator.graduated"
            ></i>
          </div>
          <h2 class="">{{ creator.name }}</h2>
        </div>
        <div class="d-flex gap-3">
          <a
            :href="creator.github"
            class="social-link text-light"
            target="_blank"
            v-if="creator.github"
          >
            <i class="fa-brands fa-github"></i>
          </a>
          <a
            :href="creator.linkedin"
            class="social-link text-light"
            target="_blank"
            v-if="creator.linkedin"
          >
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a
            :href="creator.resume"
            class="social-link text-light"
            target="_blank"
            v-if="creator.resume"
          >
            <i class="fa-solid fa-file"></i>
          </a>
        </div>
      </div>
      <p class="mb-0">{{ creator.bio }}</p>
    </div>

    <div
      class="card-footer border-0 bg-primary text-light text-end pb-3"
      v-if="creator.id == state.account?.id"
    >
      <!-- TODO Create Edit Functionality for Profile -->
      <button class="btn btn-outline text-light">EDIT</button>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";

export default {
  props: {
    creator: { type: Account, required: true },
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
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
.profile-image {
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  transform: translateY(10rem);
  outline: 0.1rem solid #439a86;
}

.card-header {
  height: 15rem;
  background-position: center;
  background-size: cover;
}

.profile-card-text {
  padding-top: 4rem;
}

.social-link {
  font-size: 1.3rem;
}

.transparent {
  opacity: 0.5;
}

a {
  text-decoration: none;
}

.btn,
.btn:focus {
  outline: 0.1rem solid;
}

.btn:hover {
  filter: brightness(110%);
}

.btn:active {
  filter: brightness(90%);
}
</style>
