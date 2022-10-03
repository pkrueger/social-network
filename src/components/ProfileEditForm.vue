<template>
  <form @submit.prevent="handleSubmit" class="text-primary">
    <div class="mb-3">
      <label for="profileNameInput" class="form-label">Profile Name</label>
      <input
        type="text"
        class="form-control"
        id="profileNameInput"
        placeholder="name..."
        minlength="3"
        maxlength="50"
        required
        v-model="editable.name"
      />
    </div>

    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="profileImageInput" class="form-label"
            >Profile Image</label
          >
          <input
            type="url"
            class="form-control"
            id="profileImageInput"
            placeholder="url..."
            maxlength="500"
            required
            v-model="editable.picture"
          />
        </div>

        <div class="mb-3">
          <label for="coverImageInput" class="form-label">Cover Image</label>
          <input
            type="url"
            class="form-control"
            id="coverImageInput"
            placeholder="url..."
            maxlength="500"
            required
            v-model="editable.coverImg"
          />
        </div>

        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="classInput" class="form-label">Class</label>
              <input
                type="text"
                class="form-control"
                id="classInput"
                placeholder="class..."
                v-model="editable.class"
              />
            </div>
          </div>
          <div class="col">
            <div class="form-check d-flex flex-column align-items-center gap-3">
              <label class="form-check-label" for="graduatedCheck">
                Graduated
              </label>
              <input
                class="form-check-input m-0"
                type="checkbox"
                value=""
                id="graduatedCheck"
                v-model="editable.graduated"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="mb-3">
          <label for="githubInput" class="form-label">Github</label>
          <input
            type="url"
            class="form-control"
            id="githubInput"
            placeholder="url..."
            v-model="editable.github"
          />
        </div>

        <div class="mb-3">
          <label for="linkedinInput" class="form-label">LinkedIn</label>
          <input
            type="url"
            class="form-control"
            id="linkedinInput"
            placeholder="url..."
            v-model="editable.linkedin"
          />
        </div>

        <div class="mb-3">
          <label for="ResumeInput" class="form-label">Resume</label>
          <input
            type="url"
            class="form-control"
            id="ResumeInput"
            placeholder="url..."
            v-model="editable.resume"
          />
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label for="bioInput" class="form-label">Bio</label>
      <textarea
        class="form-control"
        id="bioInput"
        placeholder="Tell us about yourself"
        rows="4"
        v-model="editable.bio"
      ></textarea>
    </div>

    <div class="text-end">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { accountService } from "../services/AccountService.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();

    watchEffect(() => {
      editable.value = { ...AppState.account };
    });

    async function handleSubmit() {
      try {
        await accountService.updateProfile(editable.value);
        await postsService.getCreator(route.params.id);
      } catch (error) {
        Pop.error(error, "[handleSubmit]");
      }
    }

    return { editable, handleSubmit };
  },
};
</script>

<style lang="scss" scoped></style>
