/** 作者信息接口 */
export interface Author {
  id: number
  name: string
}

/** 图片信息接口 */
export interface ImageItem {
  id: string
  url: string
  width: number
  height: number
  authorId: number
  description: string
  wb_url: string
  originalUrl: string
}

/** 瀑布流列信息接口 */
export interface WaterfallColumn {
  height: number
  items: ImageItem[]
}
