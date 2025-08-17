/**
 * UI组件相关类型定义
 */

// 选项接口
export interface Option {
  value: string
  label: string
}

// 面包屑项接口
export interface BreadcrumbItem {
  label: string
  href: string
}

// 面包屑Props
export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

// 页面头部Props
export interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

// 内容预览Props
export interface ContentPreviewProps {
  content: string
  onChange: (content: string) => void
  title?: string
  placeholder?: string
  className?: string
}

// Markdown渲染器Props
export interface MarkdownRendererProps {
  content: string
  className?: string
}

// 评分组件Props
export interface RatingProps {
  initialRating?: number;
  totalVotes?: number;
  onRate?: (rating: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  isReadOnly?: boolean;
  showReviewSystem?: boolean;
}

// 评论表单数据
export interface ReviewFormData {
  name: string;
  email: string;
  comment: string;
  rating: number;
}

// 多选组合框Props
export interface MultiComboboxProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  freeform?: boolean
}

// 多选框Props
export interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  className?: string
}

// Cusdis评论Props
export interface CusdisCommentProps {
  pageId: string;      // 页面的唯一标识符，用于区分不同页面的评论区
  pageUrl: string;     // 当前页面的完整 URL
  pageTitle: string;   // 当前页面的标题
  theme?: 'light' | 'dark' | 'auto'; // 主题，可选，默认为 'auto'
}
