<template>
  <div class="font-item" :class="isFav ? 'selected' : ''" @click="toggle">
    <div class="meta">
      <span class="name">{{ font.family }}</span>
    </div>

    <div class="sample" :style="{ fontFamily: `'${font.family}'` }">
      {{ store.text }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFontStore } from '../../stores/fontStore'

const props = defineProps({ font: Object })
const store = useFontStore()

const isFav = computed(() => store.isFavorite(props.font.postscriptName))

const toggle = () => store.toggleFavorite(props.font.postscriptName)
</script>

<style scoped>
.font-item {
  padding: 12px 16px;
  margin: 8px 12px;

  border-radius: 12px;
  background: var(--bg-soft);
  cursor: pointer;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}
.font-item.selected {
  outline: 2px solid #42b883;
}

.font-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 12px;
  opacity: 0.7;
}

.sample {
  margin-top: 6px;
  font-size: 28px;
  line-height: 1.3;
}

button.fav {
  opacity: 0;
  transition: opacity 0.15s;
}

.font-item:hover button.fav {
  opacity: 1;
}
</style>
