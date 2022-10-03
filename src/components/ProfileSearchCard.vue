<template>
  <div class="card">
    <div
      class="card-body p-3 border-0 bg-white d-flex justify-content-between rounded"
    >
      <div>
        <router-link :to="{ name: 'Profile', params: { id: creator.id } }">
          <div class="user-info d-flex">
            <img
              :src="creator.picture"
              :alt="creator.name"
              class="img-fluid post-profile-image"
              @error="loadDefaultImage"
            />
            <div class="user-text ms-3 text-overflow">
              <h5 class="card-title text-primary text-overflow">
                {{ creator.name }}
              </h5>
              <div class="d-flex">
                <i
                  class="fa-solid fa-user-graduate text-primary transparent"
                  v-if="creator.graduated"
                ></i>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Account } from "../models/Account.js";

export default {
  props: {
    creator: { type: Account, required: true },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.post-profile-image {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  object-fit: cover;
}

.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.transparent {
  opacity: 0.5;
}
</style>
