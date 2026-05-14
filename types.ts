interface Book {
  id: string
  title: string
  author: string
  entityWhitelist: string[]
  createdAt: number
  updatedAt: number
}

interface ThoughtCard {
  id: string
  bookId: string
  highlightText: string
  aiQuestions: string[]
  userAnswer: string
  createdAt: number
}
