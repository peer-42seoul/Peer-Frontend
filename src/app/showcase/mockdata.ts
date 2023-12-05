import { ICardData } from './panel/types'

export const mockData: ICardData[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1
  return {
    id: id,
    image: `https://picsum.photos/200?id=${id}`,
    name: `테스트${id}`,
    description: `테스트${id}`,
    skill: [{ name: `테스트${id}`, id: id }],
    like: 1,
    is_liked: false,
    is_favorite: false,
    team_logo: `https://picsum.photos/200?id=${id}`,
    start_date: new Date(),
    end_date: new Date(),
  }
})
