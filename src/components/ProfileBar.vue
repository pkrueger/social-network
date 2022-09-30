<template>
  <div class="px-5 text-dark text-center" v-if="state.account.id">
    <img :src="state.account.picture" alt="" class="img-fluid profile-image" />
    <div class="text-start">
      <p class="mb-0">Fall 2022</p>
      <h3 class="name">Patrick Krueger</h3>
    </div>
    <div class="social-link">
      <i class="fa-brands fa-github"></i> <span>pkrueger</span>
    </div>
    <div class="social-link">
      <i class="fa-brands fa-linkedin"></i> <span>in/patrick-krueger</span>
    </div>
    <div class="social-link">
      <i class="fa-solid fa-file"></i> <span>Resume</span>
    </div>
  </div>

  <div v-else>
    <Login />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { AppState } from "../AppState.js";
import Login from "./default/Login.vue";

export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
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
  min-height: 9rem;
  min-width: 9rem;
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
</style>
