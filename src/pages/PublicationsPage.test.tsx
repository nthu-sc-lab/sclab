import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@visx/wordcloud', () => ({
  useWordcloud: ({ words }: { words: readonly { text: string; value: number }[] }) =>
    words.map((word, index) => ({ ...word, x: index * 20, y: 0, size: 20, weight: 500 })),
}))

import { PublicationsPage } from './PublicationsPage'

describe('PublicationsPage', () => {
  it('renders every paper and filters by a cloud term', () => {
    render(<PublicationsPage />)

    expect(screen.getByText('顯示 124 / 124 篇論文')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '語音與音訊處理' }))

    expect(screen.getByText(/顯示 \d+ \/ 124 篇論文/)).toBeInTheDocument()
  })

  it('combines the year and free-text controls and can clear them', () => {
    render(<PublicationsPage />)

    fireEvent.change(screen.getByLabelText('Year'), { target: { value: '2025' } })
    expect(screen.getByText('顯示 5 / 124 篇論文')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Search'), { target: { value: '不存在的題目' } })
    expect(screen.getByText('顯示 0 / 124 篇論文')).toBeInTheDocument()
    expect(screen.getByText('沒有符合條件的論文，請調整篩選條件。')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
    expect(screen.getByText('顯示 124 / 124 篇論文')).toBeInTheDocument()
  })
})
