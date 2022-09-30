<template>
  <nav class="navbar navbar-expand-lg navbar-dark px-3">
    <nav-profile-pic />
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <i class="fa-solid fa-pen-fancy"></i>
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
      <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'About' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            About
          </router-link>
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

export default {
  setup() {
    const state = reactive({
      width: computed(() => AppState.screenWidth),
    });
    return { state };
  },
  components: { NavProfilePic },
};
</script>

<style scoped>
.navbar {
  background: rgb(128, 203, 195);
  background: linear-gradient(
    59deg,
    rgba(128, 203, 195, 1) 0%,
    rgba(141, 221, 212, 1) 100%
  );
}

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
</style>
