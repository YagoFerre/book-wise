import { CategoriesOnBookDTO } from './categoriesOnBook'
import { RatingDTO } from './rating'

export interface BookDTO {
  id: string
  name: string
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string
  ratings: RatingDTO[]
  rate: number
  categories: CategoriesOnBookDTO[]
}
