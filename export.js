import ReadingDB from './db.js'

const db = new ReadingDB()

export async function exportBookCards(bookId, bookTitle) {
  const cards = await db.getCardsByBookId(bookId)

  const lines = [`# ${bookTitle} · 阅读笔记\n`]

  for (const card of cards) {
    lines.push(`> ${card.highlightText}\n`)
    lines.push(`思考：${card.userAnswer || '_（未回答）_'}\n`)
    lines.push(`---\n`)
  }

  const md = lines.join('\n')
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${bookTitle}-阅读笔记.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
