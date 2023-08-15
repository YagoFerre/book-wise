/* eslint-disable no-use-before-define */
type User = {
  id: string
  name: string
  avatar_url?: string
  created_at: string

  accounts: Account[]
  sessions: Session[]
  ratings: Rating[]
}

type Book = {
  id: string
  name: string
  rate: number
  author: string
  summary: string
  cover_url: string
  total_pages: number
  created_at: string

  categories: CategoriesOnBooks[]
  ratings: Rating[]
}

type Category = {
  id: string
  name: string

  books: CategoriesOnBooks[]
}

type CategoriesOnBooks = {
  book_id: string
  categoryId: string

  book: Book
  category: Category
}

type Rating = {
  id: string
  rate: number
  description: string
  created_at: string

  book: Book
  book_id: string

  user: User
  user_id: string
}

type Account = {
  id: string
  user_id: string
  type: string
  provider: string
  provider_account_id: string
  refresh_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string

  user: User
}

type Session = {
  id: string
  session_token: string
  user_id: string
  expires: string

  user: User
}

type AverageRating = {
  book_id: string
  _avg: {
    rate: number
  }
}

export type { User, Session, Rating, Category, CategoriesOnBooks, Book, Account, AverageRating }
