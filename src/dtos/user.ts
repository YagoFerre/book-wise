import { RatingDTO } from './rating'
export interface UserDTO {
  id: string
  name: string
  avatar_url: string
  created_at: string

  ratings: RatingDTO[]
}
