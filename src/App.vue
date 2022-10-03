<template>
  <div class="body">
    <section
      class="profile-bar bg-white elevation-1"
      v-if="appState.screenWidth > 991"
    >
      <ProfileBar />
    </section>
    <main>
      <Navbar class="elevation-2" />
      <div class="container-fluid">
        <div class="row">
          <!-- w > 991 -->
          <div
            class="col-12"
            id="awordsBanner"
            v-if="appState.screenWidth < 992"
          >
            <AwordBar />
          </div>
          <div class="col-lg-10">
            <router-view />
          </div>
          <div class="col-lg-2 awords" v-if="appState.screenWidth > 991">
            <AwordBar />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/default/Navbar.vue";
import ProfileBar from "./components/ProfileBar.vue";
import AwordBar from "./components/default/AwordBar.vue";

export default {
  setup() {
    window.addEventListener("resize", () => {
      AppState.screenWidth = window.innerWidth;
      AppState.awordHeight =
        document.getElementById("awordsBanner")?.scrollHeight;
    });

    onMounted(() => {
      AppState.awordHeight =
        document.getElementById("awordsBanner")?.scrollHeight;
    });

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

// @media (width > 1600px) {
//   .profile-bar {
//     width: 25rem;
//   }
// }

.body {
  display: flex;
}
</style>
