<template>
  <div class="font-list">
    <header class="toolbar">
      <input v-model="fontStore.text" placeholder="表示文字" class="text" />
      <input v-model="fontStore.filter" placeholder="フォント検索" class="search" />

      <button
        class="icon"
        :class="{ active: fontStore.showFavorites }"
        @click="fontStore.toggleShowFavorites"
        title="お気に入りのみ表示"
      >
        ★
      </button>
      <button class="icon" @click="ui.toggleDark">
        {{ ui.dark ? '☀️' : '🌙' }}
      </button>
    </header>

    <div>全{{ displayFonts.length }}個</div>

    <RecycleScroller
      class="scroller"
      :items="displayFonts"
      :item-size="110"
      key-field="postscriptName"
    >
      <template #default="{ item }">
        <FontItem :font="item" />
      </template>
    </RecycleScroller>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFontStore } from '../../stores/fontStore'
import { useUIStore } from '../../stores/uiStore'
import FontItem from './FontItem.vue'

const fontStore = useFontStore()
const ui = useUIStore()

await fontStore.loadFonts()
const displayFonts = computed(() => fontStore.displayFonts)
</script>

<style scoped>
.font-list {
  height: 100%;
}

.toolbar {
  position: sticky;
  top: 0;
  z-index: 10;

  display: flex;
  gap: 12px;
  align-items: center;

  padding: 12px 16px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

.text,
.search {
  flex: 1;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  color: var(--text);
}

button.primary {
  padding: 6px 12px;
  border-radius: 8px;
  background: #42b883;
  color: white;
}

button.icon {
  font-size: 18px;
}
button.icon.active {
  color: #f5c518; /* ゴールド */
  opacity: 1;
}

.scroller {
  height: calc(100vh - 120px);
}
</style>
