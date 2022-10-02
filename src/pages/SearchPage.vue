<template>
  <div class="component">
    <!-- TODO display search results -->
  </div>
</template>

<script>
import { onMounted, onUpdated } from "vue";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute();

    async function getSearchResults() {
      try {
        await postsService.getSearchResults(route.query.query);
      } catch (error) {
        Pop.error(error, "[GetSearchResults]");
      }
    }

    onMounted(() => {
      getSearchResults();
    });

    onUpdated(() => {
      getSearchResults();
    });

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
