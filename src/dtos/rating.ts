import { UserDTO } from './user'
import { BookDTO } from '@/src/dtos/book'

export interface RatingDTO {
  id: string
  rate: number
  description: string
  created_at: string
  book: BookDTO
  book_id: string
  user_id: string
  user: UserDTO
}
