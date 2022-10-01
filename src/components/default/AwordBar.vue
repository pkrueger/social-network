<template>
  <div v-if="state.width > 991">
    <img
      :src="state.awords[0]?.tall"
      class="img-fluid aword elevation-3"
      alt="it don't work"
    />
    <img
      :src="state.awords[1]?.tall"
      class="img-fluid aword elevation-3"
      alt="it don't work"
    />
  </div>
  <div v-else class="text-center">
    <img
      :src="state.awords[0]?.banner"
      class="img-fluid aword elevation-3"
      alt="it don't work"
    />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, reactive } from "vue";
import { AppState } from "../../AppState.js";
import { awordsService } from "../../services/AwordsService.js";
import Pop from "../../utils/Pop.js";

export default {
  setup() {
    const state = reactive({
      awords: computed(() => AppState.awords),
      width: computed(() => AppState.screenWidth),
    });

    async function getAwords() {
      try {
        await awordsService.getAwords();
      } catch (error) {
        Pop.error(error, "[GetAwords]");
      }
    }

    onMounted(() => {
      getAwords();
    });

    return { state };
  },
};
</script>

<style lang="scss" scoped>
.aword {
  margin-top: 1rem;
  max-height: 45vh;
}
</style>
