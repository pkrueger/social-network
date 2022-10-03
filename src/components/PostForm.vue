<template>
  <div class="card text-primary">
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <textarea
            class="form-control"
            id="postTextInput"
            placeholder="Share what's happening"
            rows="4"
            maxlength="500"
            required
            v-model="editable.body"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="imageInput" class="form-label">Upload Image</label>
          <input
            type="url"
            class="form-control"
            id="imageInput"
            placeholder="url..."
            maxlength="500"
            v-model="editable.imgUrl"
          />
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({});

    async function handleSubmit() {
      try {
        await postsService.createPost(editable.value);
        editable.value = {};
      } catch (error) {
        Pop.error(error, "[HandleSubmit]");
      }
    }

    return { editable, handleSubmit };
  },
};
</script>

<style lang="scss" scoped></style>
