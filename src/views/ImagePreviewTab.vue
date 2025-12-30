<template>
  <ImagePreviewControls />
  <div class="panel">
    <input type="file" accept="image/*" @change="onFileChange" />
    <ImageCanvas />
  </div>
</template>

<script setup lang="ts">
import ImagePreviewControls from '../components/ImagePreview/ImagePreviewControls.vue'
import ImageCanvas from '../components/ImagePreview/ImageCanvas.vue'
import { useCanvasStore } from '../stores/canvasStore'

const canvasStore = useCanvasStore()

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return

  const file = input.files[0]
  canvasStore.loadImage(file)
}
</script>
