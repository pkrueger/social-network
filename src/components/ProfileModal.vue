<template>
  <div
    class="modal fade"
    id="profileEditModal"
    tabindex="-1"
    aria-labelledby="profileEditModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" id="profileEditModalLabel">Edit Profile</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ProfileEditForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileEditForm from "./ProfileEditForm.vue";
export default {
  setup() {
    return {};
  },
  components: { ProfileEditForm },
};
</script>

<style lang="scss" scoped></style>
