# AWSL Next

一个基于 Vue 3 + TypeScript 开发的AWSL，支持响应式布局、无限滚动加载、图片预览等功能。

## 特性

- 🖼️ 响应式瀑布流布局
- 🔄 无限滚动加载
- 🔍 图片预览
- 🌓 亮色/暗色主题
- 📱 移动端适配
- 🎯 作者筛选
- ⚡️ 性能优化
- 📐 自适应列数和图片尺寸
- 🎚️ 滚动和调整大小防抖
- 🌊 平滑过渡动画
- 🚀 图片懒加载

## 技术栈

- Vue 3
- TypeScript
- Naive UI
- Vue Router
- Pinia
- Vite
- Axios

## 开发环境

- Node.js >= 18
- bun >= 1

## 快速开始

```bash
# 克隆项目
git clone https://github.com/awsl-project/awsl-next.git

# 进入项目目录
cd awsl-next

# 安装依赖
bun install

# 启动开发服务器
bun dev
```

## 构建部署

```bash
# 构建生产版本
bun build --mode production

# 预览构建结果
bun preview
```

## 项目结构

```
src/
├── api/          # API 接口
├── assets/       # 静态资源
├── components/   # 组件
│   ├── ImageWaterfall.vue    # 瀑布流组件
│   └── TheHeader.vue         # 头部组件
├── router/       # 路由配置
├── stores/       # 状态管理
├── types/        # 类型定义
└── views/        # 页面视图
```

## 环境变量

创建 `.env.development` 或 `.env.production` 文件：

```env
# API 域名
VITE_API_HOSTNAME=your_api_hostname
```

## 自定义配置

### 瀑布流布局

可在 `ImageWaterfall.vue` 中的 `LAYOUT_CONFIG` 调整布局参数：

```typescript
const LAYOUT_CONFIG = {
  GAP: 8,                    // 图片间距
  CARD_MARGIN: 8,            // 卡片外边距
  SCROLL_THRESHOLD: 100,     // 滚动加载阈值
  RESIZE_DEBOUNCE: 100,      // 调整大小防抖延迟
  SCROLL_DEBOUNCE: 200,      // 滚动防抖延迟
  MOBILE_BREAKPOINT: 768     // 移动端断点
}
```

## 主要功能

### 瀑布流布局

- 自动计算最佳列数
- 响应式布局适配
- 图片高度自适应
- 平滑过渡动画

### 图片加载

- 无限滚动加载
- 加载状态展示
- 懒加载优化
- 错误处理

### 主题切换

- 支持亮色/暗色主题
- 主题切换动画
- 自动适应系统主题

### 移动端适配

- 触摸操作优化
- 响应式布局
- 性能优化

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## License

[MIT](LICENSE)
