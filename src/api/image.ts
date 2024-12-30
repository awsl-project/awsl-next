import axios from 'axios'
import type { Author, ImageItem } from '@/types/waterfall'

const BASE_URL = import.meta.env.VITE_API_HOSTNAME

export async function fetchAuthors(): Promise<Author[]> {
  const { data } = await axios.get(`${BASE_URL}/producers`)
  return data.map((item: any) => ({
    id: parseInt(item.uid),
    name: item.name,
  }))
}

interface FetchImagesParams {
  uid?: number | null
  limit?: number
  offset?: number
}

export async function fetchImages(params: FetchImagesParams = {}): Promise<ImageItem[]> {
  const { data } = await axios.get(`${BASE_URL}/v2/list`, {
    params: {
      uid: params.uid || '',
      limit: params.limit || 20,
      offset: params.offset || 0,
    },
  })

  return data.map((item: any) => ({
    id: item.pic_id,
    url: item.pic_info.large.url,
    width: item.pic_info.large.width,
    height: item.pic_info.large.height,
    originalUrl: item.pic_info.original.url,
    wb_url: item.wb_url,
  }))
}
