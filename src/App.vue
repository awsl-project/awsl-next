<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider, NBackTop, NButton, NIcon } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { ChevronUpOutline } from '@vicons/ionicons5'

const themeStore = useThemeStore()
</script>

<template>
  <NConfigProvider :theme="themeStore.theme">
    <div class="app">
      <RouterView />
      <NBackTop :right="20" :bottom="20">
        <NButton circle size="large">
          <template #icon>
            <NIcon>
              <ChevronUpOutline />
            </NIcon>
          </template>
        </NButton>
      </NBackTop>
    </div>
  </NConfigProvider>
</template>

<style>
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: var(--n-color);
  transition: background-color 0.3s ease;
  overflow-y: scroll;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--n-color);
  transition: background-color 0.3s ease;
}

.app {
  width: 100%;
  min-height: 100vh;
  background-color: var(--n-color);
  transition: background-color 0.3s ease;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--n-scrollbar-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--n-scrollbar-color-hover);
}

::-webkit-scrollbar-corner {
  background: transparent;
}

/* Firefox 滚动条 */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--n-scrollbar-color) transparent;
}

/* 返回顶部按钮样式 */
.n-back-top {
  transition: opacity 0.3s ease;
}

.n-back-top .n-button {
  background-color: var(--n-color-hover);
  backdrop-filter: blur(8px);
}

.n-back-top .n-button:hover {
  background-color: var(--n-color-active);
}
</style>
