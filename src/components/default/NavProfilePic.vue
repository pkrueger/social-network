<template>
  <img
    :src="
      state.account.id
        ? state.account.picture
        : 'src/assets/img/undraw-pic-profile-re-1tdc.svg'
    "
    :alt="state.account.name"
    class="navbar-picture selectable"
    data-bs-toggle="offcanvas"
    data-bs-target="#ProfileBarOffcanvas"
    aria-controls="ProfileBarOffcanvas"
    v-if="state.width < 992"
  />

  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="ProfileBarOffcanvas"
    aria-labelledby="ProfileBarOffcanvasLabel"
    v-if="state.width < 992"
  >
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ProfileBar />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { AppState } from "../../AppState.js";
import ProfileBar from "../ProfileBar.vue";

export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      width: computed(() => AppState.screenWidth),
    });
    return { state };
  },
  components: { ProfileBar },
};
</script>

<style lang="scss" scoped>
.navbar-picture {
  border-radius: 50%;
  height: 2.5rem;
}
</style>
