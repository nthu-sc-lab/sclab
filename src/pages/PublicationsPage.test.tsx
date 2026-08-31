import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PublicationsPage } from './PublicationsPage'

describe('PublicationsPage', () => {
  it('renders every paper and filters by a cloud term', () => {
    render(<PublicationsPage />)

    expect(screen.getByText('顯示 20 / 20 篇論文')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '動態壓降，2 篇論文' }))

    expect(screen.getByText('顯示 2 / 20 篇論文')).toBeInTheDocument()
    expect(screen.getByText('TAG / 動態壓降')).toBeInTheDocument()
  })

  it('combines the year and free-text controls and can clear them', () => {
    render(<PublicationsPage />)

    fireEvent.change(screen.getByLabelText('年份 Year'), { target: { value: '2025' } })
    expect(screen.getByText('顯示 5 / 20 篇論文')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('搜尋 Search'), { target: { value: '不存在的題目' } })
    expect(screen.getByText('顯示 0 / 20 篇論文')).toBeInTheDocument()
    expect(screen.getByText('沒有符合條件的論文。請調整篩選或清除條件。')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '清除 Clear' }))
    expect(screen.getByText('顯示 20 / 20 篇論文')).toBeInTheDocument()
  })
})
