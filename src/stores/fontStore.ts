import type { LocalFont } from '@/types/Font'
import { defineStore } from 'pinia'

interface State {
  /**
   * ローカルから読み込んだ全フォント群。直接表示には用いない。
   */
  fonts: LocalFont[]
  /**
   * ローカルからフォントを読み込み完了したかどうか。
   */
  loaded: boolean
  /**
   * プレビュー表示に用いるサンプルテキスト。
   * 例: `あのイーハトーヴォのすきとおった風`
   */
  text: string
  /**
   * フィルター検索用の入力欄。
   */
  filter: string
  /**
   * お気に入りフォント。
   * お気に入りフォントの`postscript`名が格納された配列を想定。
   */
  favorites: string[]
  /**
   * お気に入りフォントのみを表示するモードかどうか。
   */
  showFavorites: boolean
}

export const useFontStore = defineStore('fonts', {
  state: () =>
    ({
      fonts: [],
      loaded: false,
      text: 'あのイーハトーヴォのすきとおった風',
      filter: '',
      favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
      showFavorites: false,
    }) as State,

  getters: {
    displayFonts(state) {
      let result = state.fonts

      if (state.filter) {
        result = result.filter((f) => f.family.toLowerCase().includes(state.filter.toLowerCase()))
      }

      if (state.showFavorites) {
        result = result.filter((f) => state.favorites.includes(f.postscriptName))
      }

      return result
    },
    isFavorite: (state) => (postscript: string) => state.favorites.includes(postscript),

    // 画像プレビュー機能にて使用
    favoriteFonts(state) {
      return state.fonts.filter((f) => state.favorites.includes(f.postscriptName))
    },
  },

  actions: {
    async loadFonts() {
      if (this.loaded) return

      this.fonts = await window.queryLocalFonts()
      this.loaded = true
    },

    toggleFavorite(postscript: string) {
      if (this.favorites.includes(postscript)) {
        this.favorites = this.favorites.filter((f) => f !== postscript)
      } else {
        this.favorites.push(postscript)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    toggleShowFavorites() {
      this.showFavorites = !this.showFavorites
    },
  },
})
