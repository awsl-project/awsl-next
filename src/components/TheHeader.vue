<script setup lang="ts">
import { NSelect, NButton, NIcon, NImage } from 'naive-ui'
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'
import type { Author } from '@/types/waterfall'

defineProps<{
  authors: Author[]
  selectedAuthorId: number | null
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:author': [authorId: number | null]
}>()

const themeStore = useThemeStore()
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <NImage
          src="https://www.awsl.icu/awsl.png"
          width="32"
          preview-disabled
          class="logo-image"
        />
        <h1>AWSL</h1>
      </div>
      <div class="controls">
        <NSelect
          :value="selectedAuthorId"
          :options="
            authors.map((author) => ({
              label: author.name,
              value: author.id,
            }))
          "
          :loading="loading"
          clearable
          placeholder="选择作者"
          @update:value="emit('update:author', $event)"
        />
        <NButton quaternary circle class="theme-switch" @click="themeStore.toggleTheme">
          <template #icon>
            <NIcon size="18">
              <SunnyOutline v-if="themeStore.isDark" />
              <MoonOutline v-else />
            </NIcon>
          </template>
        </NButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  backdrop-filter: blur(8px);
  background-color: rgba(var(--n-color-start-rgb), 0.95);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.header-content {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-image {
  border-radius: 8px;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #42b883, #35495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

:deep(.n-select) {
  width: 200px;
}

:deep(.n-base-selection) {
  background-color: rgba(255, 255, 255, 0.04);
}

:deep(.n-base-selection-label) {
  color: var(--n-text-color);
}

:deep(.n-base-selection-placeholder) {
  color: var(--n-placeholder-color);
}

.theme-switch {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .logo h1 {
    font-size: 1.25rem;
  }

  :deep(.n-select) {
    width: 160px;
  }
}
</style>
