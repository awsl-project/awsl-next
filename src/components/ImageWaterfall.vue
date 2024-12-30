<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { NImage, NCard, NSpin, NButton, NIcon } from 'naive-ui'
import { OpenOutline } from '@vicons/ionicons5'
import type { ImageItem } from '@/types/waterfall'
import { debounce } from 'lodash-es'

const props = defineProps<{
  images: ImageItem[]
  loading?: boolean
  hasMore?: boolean
  minColWidth?: number
  maxColumns?: number
}>()

const emit = defineEmits<{
  'load-more': []
}>()

const containerRef = ref<HTMLElement | null>(null)
const columns = ref<ImageItem[][]>([])
const columnCount = ref(1)
const columnWidth = ref(240)

function calculateColumnCount() {
  if (!containerRef.value) return

  const containerWidth = containerRef.value.clientWidth
  const minColWidth = props.minColWidth || 240
  const maxColumns = props.maxColumns || 8

  // 计算可能的列数
  const possibleColumnCount = Math.floor(containerWidth / minColWidth)

  // 确保列数在合理范围内
  columnCount.value = Math.min(Math.max(1, possibleColumnCount), maxColumns)

  // 计算实际列宽（考虑间距）
  const totalGap = 8 * (columnCount.value - 1)
  columnWidth.value = Math.floor((containerWidth - totalGap) / columnCount.value)
}

function distributeImages() {
  // 重置列
  columns.value = Array.from({ length: columnCount.value }, () => [])

  // 分配图片到最短的列
  props.images.forEach((image) => {
    const shortestColumn = columns.value.reduce((prev, curr) =>
      getColumnHeight(curr) < getColumnHeight(prev) ? curr : prev,
    )
    shortestColumn.push(image)
  })
}

function getColumnHeight(column: ImageItem[]) {
  return column.reduce((height, image) => {
    // 使用 API 返回的尺寸计算高度
    const scaledHeight = (columnWidth.value * image.height) / image.width
    return height + scaledHeight + 8
  }, 0)
}

function calculateImageHeight(image: ImageItem): number {
  // 使用 API 返回的尺寸计算高度
  return Math.floor((columnWidth.value * image.height) / image.width)
}

// 使用 debounce 优化 resize 处理
const handleResize = debounce(() => {
  calculateColumnCount()
  distributeImages()
}, 100)

// 使用 debounce 优化滚动处理
const handleScroll = debounce(() => {
  if (props.loading || !props.hasMore) return

  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  // 当距离底部 100px 时触发加载
  if (documentHeight - (scrollTop + windowHeight) < 100) {
    emit('load-more')
  }
}, 200)

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  // 监听容器大小变化
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerRef.value)
  }

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)

  // 监听滚动事件
  window.addEventListener('scroll', handleScroll)

  // 初始化布局
  handleResize()
})

onUnmounted(() => {
  // 清理 ResizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  // 移除事件监听
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)

  // 取消未执行的 debounce 函数
  handleResize.cancel()
  handleScroll.cancel()
})

// 监听图片数组变化
watch(
  () => props.images,
  () => {
    distributeImages()
  },
  { deep: true },
)

// 监听列数变化
watch(columnCount, () => {
  distributeImages()
})
</script>

<template>
  <div ref="containerRef" class="waterfall">
    <NSpin :show="loading">
      <div class="columns">
        <div
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          class="column"
          :style="{ width: `${columnWidth}px` }"
        >
          <NCard
            v-for="image in column"
            :key="image.id"
            class="image-card"
            :content-style="{ padding: 0 }"
            :header-style="{ padding: 0 }"
            :footer-style="{ padding: 0 }"
            :segmented="{ content: false }"
            :bordered="false"
            :style="{ marginBottom: '8px' }"
          >
            <div class="image-wrapper">
              <NImage
                :src="image.url"
                :width="columnWidth"
                :height="calculateImageHeight(image)"
                :preview-src="image.originalUrl"
                object-fit="cover"
                :show-toolbar-tooltip="false"
                :preview-disabled="false"
                :style="{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '4px',
                  cursor: 'zoom-in',
                }"
              />
              <NButton
                quaternary
                circle
                size="small"
                class="open-link"
                tag="a"
                :href="image.wb_url"
                target="_blank"
                :style="{
                  '--n-text-color': '#ffffff',
                  '--n-text-color-hover': '#ffffff',
                  '--n-text-color-pressed': '#ffffff',
                }"
              >
                <template #icon>
                  <NIcon>
                    <OpenOutline />
                  </NIcon>
                </template>
              </NButton>
            </div>
          </NCard>
        </div>
      </div>
      <div v-if="!loading && !hasMore" class="no-more">没有更多了</div>
    </NSpin>
  </div>
</template>

<style scoped>
.waterfall {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.columns {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 0 auto;
  transition: gap 0.2s ease;
}

.column {
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease;
}

.image-card {
  transition: all 0.2s ease;
  overflow: hidden;
  background-color: transparent;
  will-change: transform, width;
}

.image-card:hover {
  transform: translateY(-2px);
}

.image-wrapper {
  position: relative;
  transition: width 0.2s ease;
  will-change: transform;
}

.open-link {
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.image-wrapper:hover .open-link {
  opacity: 1;
}

.no-more {
  text-align: center;
  padding: 16px;
  color: var(--n-text-color-3);
}

:deep(.n-card) {
  background-color: transparent;
}

:deep(.n-card-header),
:deep(.n-card__content),
:deep(.n-card__footer) {
  padding: 0 !important;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .image-wrapper {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  :deep(.n-image) {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .open-link {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.3);
    right: 12px;
  }
}
</style>
