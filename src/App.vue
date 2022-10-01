<template>
  <div class="body">
    <section
      class="profile-bar bg-white elevation-1"
      v-if="appState.screenWidth > 991"
    >
      <!-- TODO Create Profile Sidebar and put here -->
      <ProfileBar />
    </section>
    <main>
      <Navbar class="elevation-2" />
      <div class="container-fluid">
        <div class="row">
          <!-- w > 991 -->
          <div class="col-12 awords" v-if="appState.screenWidth < 992">
            <AwordBar />
          </div>
          <!-- TODO Calculate vertical space for content -->
          <div class="col-lg-10 infinite-scroll">
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
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbars } from "overlayscrollbars";

export default {
  setup() {
    window.addEventListener("resize", () => {
      AppState.screenWidth = window.innerWidth;
    });

    // TODO Try moving this to HomePage.vue and see if I need to wrap a div around the repeating card and apply this there
    function getNextPosts() {
      const element = document.querySelector(".infinite-scroll");
      element.addEventListener("scroll", (event) => {
        if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
          alert("you're at the bottom of the page");
        }

        // if (bottom) {
        //   postsService.getPosts();
        // }
      });
    }

    onMounted(() => {
      getNextPosts();
      OverlayScrollbars(document.querySelector(".infinite-scroll"), {});
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

@media (width > 1600px) {
  .profile-bar {
    width: 25rem;
  }
}

.body {
  display: flex;
}

.infinite-scroll {
  overflow: auto;
  height: calc(100vh - 3.5rem);
}
</style>
