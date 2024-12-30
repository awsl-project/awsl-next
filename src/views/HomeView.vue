<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NLayout, NLayoutContent } from 'naive-ui'
import TheHeader from '@/components/TheHeader.vue'
import ImageWaterfall from '@/components/ImageWaterfall.vue'
import type { Author, ImageItem } from '@/types/waterfall'
import { fetchAuthors, fetchImages } from '@/api/image'

const authors = ref<Author[]>([])
const images = ref<ImageItem[]>([])
const loading = ref(false)
const selectedAuthorId = ref<number | null>(null)
const page = ref(0)
const hasMore = ref(true)

async function loadAuthors() {
  try {
    authors.value = await fetchAuthors()
  } catch (error) {
    console.error('Failed to load authors:', error)
  }
}

async function loadImages(isLoadMore = false) {
  if (loading.value || (!isLoadMore && !hasMore.value)) return

  loading.value = true
  try {
    const newImages = await fetchImages({
      uid: selectedAuthorId.value,
      limit: 40,
      offset: page.value * 40,
    })

    if (newImages.length < 40) {
      hasMore.value = false
    }

    if (isLoadMore) {
      images.value.push(...newImages)
      page.value++
    } else {
      images.value = newImages
      page.value = 1
      hasMore.value = true
    }
  } catch (error) {
    console.error('Failed to load images:', error)
  } finally {
    loading.value = false
  }
}

function resetState() {
  page.value = 0
  hasMore.value = true
  images.value = []
}

function handleAuthorChange(authorId: number | null) {
  if (selectedAuthorId.value === authorId) return

  selectedAuthorId.value = authorId
  resetState()
  loadImages()
}

function handleLoadMore() {
  if (!loading.value && hasMore.value) {
    loadImages(true)
  }
}

onMounted(() => {
  loadAuthors()
  loadImages()
})
</script>

<template>
  <NLayout class="home">
    <TheHeader
      :authors="authors"
      :selected-author-id="selectedAuthorId"
      :loading="loading"
      @update:author="handleAuthorChange"
    />
    <NLayoutContent class="content">
      <ImageWaterfall
        :images="images"
        :loading="loading"
        :has-more="hasMore"
        :min-col-width="240"
        :max-columns="8"
        @load-more="handleLoadMore"
      />
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
  padding-right: 8px;
  box-sizing: border-box;
}

.content {
  padding-top: 64px;
}
</style>
