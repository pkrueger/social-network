<template>
  <div class="body">
    <section class="profile-bar bg-white elevation-1">
      <!-- TODO Create Profile Sidebar and put here -->
      <ProfileBar />
    </section>
    <main>
      <Navbar class="elevation-2" />
      <router-view />
    </main>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/default/Navbar.vue";
import ProfileBar from "./components/ProfileBar.vue";

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
  components: { Navbar, ProfileBar },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.profile-bar {
  height: 100vh;
  width: 20rem;
}

.body {
  display: flex;
}
</style>
