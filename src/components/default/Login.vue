<template>
  <transition name="slide-fade">
    <button
      class="btn selectable text-secondary text-uppercase"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>
  </transition>

  <div class="dropdown my-2 my-lg-0" v-if="user.isAuthenticated">
    <div
      class="dropdown-toggle selectable"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      id="authDropdown"
    >
      <transition name="slide-fade">
        <div v-if="account.id">
          <span class="mx-3 text-primary">{{ account.name || user.name }}</span>
        </div>
      </transition>
    </div>
    <div
      class="dropdown-menu p-0 list-group w-100"
      aria-labelledby="authDropdown"
    >
      <router-link :to="{ name: 'Profile', params: { id: `${account.id}` } }">
        <div class="list-group-item list-group-item-action hoverable">
          View Profile
        </div>
      </router-link>
      <div
        class="list-group-item list-group-item-action hoverable text-danger"
        @click="logout"
      >
        <i class="mdi mdi-logout"></i>
        logout
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../../AppState";
import { AuthService } from "../../services/AuthService";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}

.btn {
  font-size: 2rem;
  border-radius: 1rem;
  margin: 0rem 6rem;
  padding: 0.5rem 0rem;
  transition: filter 100ms ease;
}

.btn:hover {
  filter: brightness(110%);
}

.btn:active {
  filter: brightness(90%);
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
</style>
