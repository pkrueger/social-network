<template>
  <form @submit.prevent="">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="searchButton"
        v-model="editable.query"
      />
      <router-link
        :to="{ name: 'Search', query: { query: editable.query } }"
        @click="editable = {}"
      >
        <button class="btn btn-outline-light" type="submit" id="searchButton">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </router-link>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const editable = ref({});
    // TODO Make the form submit a router link and remove router link tag in template
    return { editable };
  },
};
</script>

<style lang="scss" scoped></style>
