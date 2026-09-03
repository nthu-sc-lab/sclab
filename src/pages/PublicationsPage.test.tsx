import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@visx/wordcloud', () => ({
  useWordcloud: ({ words }: { words: Array<{ text: string }> }) =>
    words.map((word, index) => ({
      ...word,
      font: 'sans-serif',
      size: 24,
      weight: 700,
      rotate: 0,
      x: (index % 6) * 120 - 300,
      y: Math.floor(index / 6) * 55 - 110,
    })),
}))

import { PublicationsPage } from './PublicationsPage'

describe('ThesesAndDissertationsPage', () => {
  it('sorts and paginates papers and filters by a topic tag', () => {
    render(<PublicationsPage />)

    expect(screen.getByText(/顯示 124 \/ 124 篇學位論文 · 第 1 \/ 13 頁/)).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(10)
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true')

    const topic = screen.getByRole('button', { name: /Deep Learning, appears in/ })
    const initialFill = topic.getAttribute('fill')
    fireEvent.click(topic)

    expect(screen.getByText(/顯示 \d+ \/ 124 篇學位論文 · 第 1 \/ \d+ 頁/)).toBeInTheDocument()
    expect(screen.getByText('FILTER / Deep Learning')).toBeInTheDocument()
    expect(topic).toHaveClass('active')
    expect(topic).toHaveAttribute('aria-pressed', 'true')
    expect(topic.getAttribute('fill')).not.toBe(initialFill)

    fireEvent.click(screen.getByRole('button', { name: '中文' }))
    expect(screen.getByRole('button', { name: '中文' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /深度學習，出現在/ })).toBeInTheDocument()
    expect(screen.queryByText(/FILTER \/ Deep Learning/)).not.toBeInTheDocument()
  })

  it('combines the year range and free-text controls and can clear them', () => {
    render(<PublicationsPage />)

    const startYear = screen.getByLabelText('起始年份')
    const endYear = screen.getByLabelText('結束年份')

    expect(startYear).toHaveAttribute('type', 'range')
    expect(endYear).toHaveAttribute('type', 'range')

    fireEvent.change(startYear, { target: { value: '2025' } })
    fireEvent.change(endYear, { target: { value: '2025' } })
    expect(screen.getByText(/顯示 5 \/ 124 篇學位論文/)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Search'), { target: { value: '不存在的題目' } })
    expect(screen.getByText(/顯示 0 \/ 124 篇學位論文/)).toBeInTheDocument()
    expect(screen.getByText('沒有符合條件的學位論文，請調整篩選條件。')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(screen.getByText(/顯示 124 \/ 124 篇學位論文/)).toBeInTheDocument()
  })
})
