import { CategoriesOnBookDTO } from './categoriesOnBook'

export interface CategoriesDTO {
  id: string
  name: string
  books: CategoriesOnBookDTO[]
}
