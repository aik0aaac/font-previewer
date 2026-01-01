<template>
  <div class="controls">
    <div class="row primary">
      <input v-model="canvas.textLayer.text" class="text-input" placeholder="Sample Text" />

      <div class="font-picker">
        <button
          v-for="font in favoriteFonts"
          :key="font.postscriptName"
          :style="{ fontFamily: font.family }"
          :class="{ active: canvas.textLayer.fontFamily === font.family }"
          @click="canvas.setFont(font.family, font.fullName)"
        >
          {{ font.family }}
        </button>
      </div>

      <div class="slider">
        <input type="range" min="12" max="120" v-model="canvas.textLayer.fontSize" />
        <span>{{ canvas.textLayer.fontSize }}px</span>
      </div>

      <label class="color">
        🎨
        <input type="color" v-model="canvas.textLayer.color" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFontStore } from '../../stores/fontStore'
import { useCanvasStore } from '../../stores/canvasStore'
const canvas = useCanvasStore()
const fontStore = useFontStore()

const favoriteFonts = computed(() => fontStore.favoriteFonts)
</script>

<style scoped>
.controls {
  position: sticky;
  top: 48px; /* タブ分 */
  z-index: 10;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 12px 16px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.row.primary {
  font-size: 14px;
}

.row.secondary {
  opacity: 0.85;
}

.text-input {
  flex: 1;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
}

.slider {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 160px;
}

.slider span {
  font-size: 12px;
  color: var(--text-muted);
  width: 40px;
  text-align: right;
}

.color input {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

select {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
}

.font-picker {
  display: flex;
  max-width: 800px;
  gap: 8px;
  overflow-x: auto;
}

.font-picker button {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  white-space: nowrap;
}

.font-picker button.active {
  border-color: #42b883;
}
</style>
