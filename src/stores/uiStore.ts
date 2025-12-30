import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    dark: localStorage.getItem('dark') === 'true',
  }),

  actions: {
    toggleDark() {
      this.dark = !this.dark
      localStorage.setItem('dark', this.dark ? 'true' : 'false')
      document.documentElement.dataset.theme = this.dark ? 'dark' : 'light'
    },
  },
})
