interface tag {
  id: number
  name: string
}

export interface ICardData {
  id: number
  image: string | null
  name: string
  description: string
  skill: tag[]
  like: number
  liked: boolean
  favorite: boolean
  teamLogo: string | null
  start: Date
  end: Date
}
