import type { ImageItem, WaterfallColumn } from '@/types/waterfall'

/**
 * 计算瀑布流列数
 * @param containerWidth - 容器宽度
 * @param minColWidth - 最小列宽
 * @param maxColumns - 最大列数
 * @returns 计算得到的列数
 */
export function calculateColumns(
  containerWidth: number,
  minColWidth: number = 200,
  maxColumns: number = 8,
): number {
  // 根据容器宽度和最小列宽计算可能的列数
  const possibleCols = Math.floor(containerWidth / minColWidth)
  // 确保列数在合理范围内
  return Math.min(Math.max(possibleCols, 1), maxColumns)
}

/**
 * 初始化瀑布流列
 * @param columnCount - 列数
 * @returns 初始化的列数组
 */
export function initializeColumns(columnCount: number): WaterfallColumn[] {
  return Array.from({ length: columnCount }, () => ({
    height: 0,
    items: [],
  }))
}

/**
 * 找到高度最小的列
 * @param columns - 列数组
 * @returns 高度最小的列的索引
 */
export function findShortestColumn(columns: WaterfallColumn[]): number {
  return columns.reduce(
    (minIndex, column, currentIndex) =>
      column.height < columns[minIndex].height ? currentIndex : minIndex,
    0,
  )
}

/**
 * 将图片添加到瀑布流中
 * @param columns - 列数组
 * @param image - 图片信息
 * @param columnWidth - 列宽
 */
export function addImageToColumn(
  columns: WaterfallColumn[],
  image: ImageItem,
  columnWidth: number,
): void {
  const shortestColumnIndex = findShortestColumn(columns)
  const column = columns[shortestColumnIndex]

  // 计算图片在当前列宽下的实际高度
  const aspectRatio = image.width / image.height
  const scaledHeight = columnWidth / aspectRatio

  // 更新列信息
  column.items.push(image)
  column.height += scaledHeight
}

/**
 * 重新排列瀑布流
 * @param images - 图片数组
 * @param columnCount - 列数
 * @param columnWidth - 列宽
 * @returns 排列后的列数组
 */
export function arrangeWaterfall(
  images: ImageItem[],
  columnCount: number,
  columnWidth: number,
): WaterfallColumn[] {
  const columns = initializeColumns(columnCount)

  images.forEach((image) => {
    addImageToColumn(columns, image, columnWidth)
  })

  return columns
}
