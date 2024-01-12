export enum ReviewType {
  'TEAM',
  'SELF',
  'PEER',
}

export enum QuestionType {
  'TEXT',
  'STARS',
}

export interface Review {
  id: string
  target: ReviewType
  type: QuestionType
  question: string
}
