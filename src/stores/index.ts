import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  // 状态
  const state = ref({
    // 在这里定义状态
  })

  // Getters (computed)
  const someGetter = computed(() => {
    // 在这里定义计算属性
  })

  // Actions
  function someAction() {
    // 在这里定义方法
  }

  return {
    state,
    someGetter,
    someAction,
  }
})
