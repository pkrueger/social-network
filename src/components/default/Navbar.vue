<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
    <nav-profile-pic />
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <i class="fa-solid fa-pen-fancy text-light"></i>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav ms-auto">
        <li>
          <search-form class="pt-3 pb-lg-3" />
        </li>
      </ul>
    </div>
  </nav>
  <!-- TODO Put in a search bar -->
</template>

<script>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { AppState } from "../../AppState.js";
import NavProfilePic from "./NavProfilePic.vue";
import SearchForm from "../SearchForm.vue";

export default {
  setup() {
    const state = reactive({
      width: computed(() => AppState.screenWidth),
    });
    return { state };
  },
  components: { NavProfilePic, SearchForm },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media (width > 991px) {
  .navbar {
    height: 3.5rem;
  }
}
</style>
