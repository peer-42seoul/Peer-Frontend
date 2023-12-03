interface tag {
  id: number
  name: string
}

export interface ICardData {
  id: number
  image: string
  name: string
  description: string
  skill: tag[]
  like: number
  is_liked: boolean
  is_favorite: boolean
  team_logo: string | null
  start_date: Date
  end_date: Date
}
