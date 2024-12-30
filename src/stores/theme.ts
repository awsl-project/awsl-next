import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  const theme = computed<GlobalTheme | null>(() => (isDark.value ? darkTheme : null))

  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  return {
    isDark,
    theme,
    toggleTheme,
  }
})
