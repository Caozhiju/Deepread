import Dexie from 'dexie'

class ReadingDB extends Dexie {
  constructor() {
    super('ReadingDB')

    this.version(1).stores({
      books: 'id, title',
      thoughtCards: 'id, bookId',
    })
  }

  async addBook(book) {
    const data = {
      ...book,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await this.books.add(data)
    return data
  }

  async findBookByTitle(title) {
    return this.books.where('title').equals(title).first()
  }

  async addThoughtCard(card) {
    const data = {
      ...card,
      createdAt: Date.now(),
    }
    await this.thoughtCards.add(data)
    return data
  }

  async getCardsByBookId(bookId) {
    return this.thoughtCards.where('bookId').equals(bookId).toArray()
  }

  async updateEntityWhitelist(bookId, whitelist) {
    return this.books.update(bookId, {
      entityWhitelist: whitelist,
      updatedAt: Date.now(),
    })
  }
}

export default ReadingDB
