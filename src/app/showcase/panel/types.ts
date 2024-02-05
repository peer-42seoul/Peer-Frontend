export interface IShowcaseTag {
  id: number
  name: string
  color: string
}

export interface ICardData {
  id: number
  image: string | null
  name: string
  description: string
  skill: IShowcaseTag[]
  like: number
  liked: boolean
  favorite: boolean
  teamLogo: string | null
  start: Date
  end: Date
}
