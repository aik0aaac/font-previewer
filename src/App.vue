<template>
  <div :class="{ dark: ui.darkMode }" class="app">
    <header class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: currentTab === tab.id }"
        @click="currentTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </header>

    <Suspense>
      <template #default>
        <keep-alive>
          <component :is="currentComponent" />
        </keep-alive>
      </template>

      <template #fallback>
        <LoadingView />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from './stores/uiStore'
import { computed, ref } from 'vue'
import FontPreviewTab from './views/FontPreviewTab.vue'
import ImagePreviewTab from './views/ImagePreviewTab.vue'
import LoadingView from './components/common/LoadingView.vue'

const ui = useUIStore()

type TabId = 'fonts' | 'image'

const tabs = [
  { id: 'fonts' as TabId, label: 'フォント一覧' },
  { id: 'image' as TabId, label: '画像プレビュー' },
]

const currentTab = ref<TabId>('fonts')

const currentComponent = computed(() => {
  return currentTab.value === 'fonts' ? FontPreviewTab : ImagePreviewTab
})
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid var(--border);
}

button {
  background: none;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
}
button.active {
  border-bottom: 2px solid #42b883;
  font-weight: bold;
}
</style>
