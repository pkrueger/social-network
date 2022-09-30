<template>
  <div class="component"></div>
</template>

<script>
import { onMounted } from "vue";
import { awordsService } from "../../services/AwordsService.js";
import Pop from "../../utils/Pop.js";

export default {
  setup() {
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
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
