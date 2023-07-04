import { CategoriesDTO } from '@/src/dtos/categories'
import { BookDTO } from './book'

export interface CategoriesOnBookDTO {
  book_id: string
  categoryId: string

  book: BookDTO
  category: CategoriesDTO
}
