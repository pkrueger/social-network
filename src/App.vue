<template>
  <div class="body">
    <section class="profile-bar bg-white elevation-1">
      <!-- TODO Create Profile Sidebar and put here -->
      <ProfileBar />
    </section>
    <main>
      <Navbar class="elevation-2" />
      <div class="container">
        <div class="row">
          <div class="col-xl-9">
            <router-view />
          </div>
          <div class="col-xl-3">
            <AwordBar />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/default/Navbar.vue";
import ProfileBar from "./components/ProfileBar.vue";
import AwordBar from "./components/default/AwordBar.vue";

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
  components: { Navbar, ProfileBar, AwordBar },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.profile-bar {
  height: 100vh;
  width: 20rem;
}

@media (width > 1600px) {
  .profile-bar {
    width: 25rem;
  }
}

.body {
  display: flex;
}
</style>
