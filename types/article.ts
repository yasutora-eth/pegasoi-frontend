export type ArticleStatus = "draft" | "in_review" | "published" | "archived"

export interface Article {
  id: string
  title: string
  content: string
  author: string
  reference: string
  status: ArticleStatus
  createdAt: string
  updatedAt: string
}
