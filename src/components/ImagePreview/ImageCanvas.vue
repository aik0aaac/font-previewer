<template>
  <div class="canvas-wrap">
    <canvas
      ref="canvas"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useCanvasStore, type TextLayer } from '../../stores/canvasStore'

const canvas = ref<HTMLCanvasElement | null>(null)
const store = useCanvasStore()

let ctx: CanvasRenderingContext2D | null = null

let isDragging = false
let offsetX = 0
let offsetY = 0

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  redraw()
})

watch(() => [store.image, store.textLayer], redraw, { deep: true })

function redraw() {
  if (!ctx || !canvas.value) return

  const { image, textLayer } = store

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  if (image) {
    canvas.value.width = image.width
    canvas.value.height = image.height
    ctx.drawImage(image, 0, 0)
  }

  ctx.font = `${textLayer.fontSize}px "${textLayer.fontFamily}"`
  ctx.fillStyle = textLayer.color
  ctx.fillText(textLayer.text, textLayer.x, textLayer.y)

  if (store.textLayer) {
    drawText(ctx, store.textLayer)
  }
}

function drawText(ctx: CanvasRenderingContext2D, layer: TextLayer) {
  ctx.font = `${layer.fontSize}px "${layer.fontFamily}"`
  ctx.fillStyle = layer.color

  if (layer.writingMode === 'horizontal') {
    ctx.fillText(layer.text, layer.x, layer.y)
    return
  }

  // ===== 縦書き =====
  const chars = Array.from(layer.text)
  let x = layer.x
  let y = layer.y

  chars.forEach((char) => {
    ctx.save()

    // 記号・英数字を90度回転（簡易対応）
    if (/[A-Za-z0-9]/.test(char)) {
      ctx.translate(x, y)
      ctx.rotate(Math.PI / 2)
      ctx.fillText(char, 0, 0)
      ctx.restore()
    } else {
      ctx.fillText(char, x, y)
    }

    y += layer.fontSize
  })
}

function isHitText(x: number, y: number): boolean {
  if (!ctx || !canvas.value) return false

  const t = store.textLayer
  ctx.font = `${t.fontSize}px ${t.fontFamily}`
  const metrics = ctx.measureText(t.text)

  const width = metrics.width
  const height = t.fontSize

  return x >= t.x && x <= t.x + width && y <= t.y && y >= t.y - height
}

function getMousePos(e: MouseEvent) {
  const canvasEl = canvas.value
  if (!canvasEl) {
    return { x: 0, y: 0 }
  }

  const rect = canvasEl.getBoundingClientRect()

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

function onMouseDown(e: MouseEvent) {
  const { x, y } = getMousePos(e)
  if (isHitText(x, y)) {
    isDragging = true
    offsetX = x - store.textLayer.x
    offsetY = y - store.textLayer.y
  }
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging) return

  const { x, y } = getMousePos(e)
  store.setTextPosition(x - offsetX, y - offsetY)
}

function onMouseUp() {
  isDragging = false
}
</script>

<style scoped>
.canvas-wrap {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding: 24px;
  background: repeating-conic-gradient(#eee 0% 25%, #ddd 0% 50%) 50% / 24px 24px;
}

.dark .canvas-wrap {
  background: repeating-conic-gradient(#333 0% 25%, #2a2a2a 0% 50%) 50% / 24px 24px;
}

canvas {
  max-width: 100%;
  max-height: 90vh;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  cursor: move;
}
</style>
