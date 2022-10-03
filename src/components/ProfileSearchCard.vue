<template>
  <div class="card">
    <div class="card-body">
      <img
        :src="creator.picture"
        :alt="creator.name"
        class="img-fluid profile-image"
        @error="loadDefaultImage"
      />
      <div class="text-light profile-card-text">
        <div class="d-flex align-items-center">
          <p class="mb-0 transparent fs-6" v-if="creator.class">
            {{ creator.class }}
          </p>
          <i
            class="fa-solid fa-user-graduate transparent ms-3"
            v-if="creator.graduated"
          ></i>
        </div>
        <h2 class="">{{ creator.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
