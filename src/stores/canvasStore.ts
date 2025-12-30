import { defineStore } from 'pinia'

export interface TextLayer {
  text: string
  x: number
  y: number
  fontSize: number
  fontFamily: string
  color: string
  writingMode: 'horizontal' | 'vertical'
}

export const useCanvasStore = defineStore('canvas', {
  state: (): {
    image: HTMLImageElement | null
    textLayer: TextLayer
  } => ({
    image: null,
    textLayer: {
      text: 'Sample Text',
      x: 100,
      y: 100,
      fontSize: 48,
      fontFamily: 'sans-serif',
      color: '#000000',
      writingMode: 'horizontal',
    },
  }),

  actions: {
    loadImage(file: File) {
      const img = new Image()
      img.src = URL.createObjectURL(file)

      img.onload = () => {
        this.image = img
      }
    },
    updateText(payload: Partial<TextLayer>) {
      this.textLayer = { ...this.textLayer, ...payload }
    },
    setTextPosition(x: number, y: number) {
      this.textLayer.x = x
      this.textLayer.y = y
    },
    setFont(family: string) {
      this.textLayer.fontFamily = family
    },
  },
})
