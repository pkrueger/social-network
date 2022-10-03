<template>
  <div
    class="login"
    :style="state.account.id ? 'margin-top: 1rem;' : 'height: 100%'"
  >
    <Login />
    <transition name="slide-fade">
      <p class="transparent text-dark" v-if="!state.user.isAuthenticated">
        to post and interact with other posts
      </p>
    </transition>
  </div>

  <transition name="slide-fade">
    <div class="px-5 text-primary text-center" v-if="state.account.id">
      <img
        :src="state.account.picture"
        alt=""
        class="img-fluid profile-image"
      />
      <div class="text-start text-primary text-start">
        <p class="mb-0 transparent" v-if="state.account.class">
          {{ state.account.class }}
        </p>
        <h3 class="name text-overflow">{{ state.account.name }}</h3>
      </div>
      <div class="social-link text-primary" v-if="state.account.github">
        <i class="fa-brands fa-github"></i>
        <span>{{
          state.account.github.split("/")[
            state.account.github.split("/").length - 1
          ]
        }}</span>
      </div>
      <div
        class="social-link text-primary text-start"
        v-if="state.account.linkedin"
      >
        <i class="fa-brands fa-linkedin"></i>
        <span>{{
          state.account.linkedin.split("in/")[
            state.account.linkedin.split("in/").length - 1
          ]
        }}</span>
      </div>
      <div
        class="social-link text-primary text-start"
        v-if="state.account.resume"
      >
        <i class="fa-solid fa-file"></i> <span>Resume</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, reactive } from "vue";
import { AppState } from "../AppState.js";
import Login from "./default/Login.vue";

export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
    });
    return { state };
  },
  components: { Login },
};
</script>

<style lang="scss" scoped>
.profile-image {
  margin: 7rem 0 3rem 0;
  border-radius: 50%;
  height: 12rem;
  width: 12rem;
  object-fit: cover;
}

.name {
  margin-bottom: 1rem;
}

.social-link {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  i {
    font-size: 1.75rem;
    width: 28px;
  }
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  text-align: center;
  transition: height 200ms ease;
}

.transparent {
  opacity: 0.5;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
