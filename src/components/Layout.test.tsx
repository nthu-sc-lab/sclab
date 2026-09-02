import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Layout } from './Layout'

describe('Layout interactions', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn())
  })

  it('closes a clicked navigation dropdown when the pointer leaves its group', () => {
    render(
      <MemoryRouter>
        <Layout>
          <section>Page content</section>
        </Layout>
      </MemoryRouter>,
    )

    const trigger = screen.getByRole('button', { name: 'About' })
    const group = trigger.closest('.nav-group')

    expect(group).not.toBeNull()
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    fireEvent.mouseLeave(group!)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('registers page sections and content cards for reveal animation', async () => {
    const { container } = render(
      <MemoryRouter>
        <Layout>
          <section>Above-the-fold content</section>
          <section>
            <article>Animated card</article>
          </section>
        </Layout>
      </MemoryRouter>,
    )

    const sections = container.querySelectorAll('#main-content > section')
    const article = screen.getByRole('article')

    await waitFor(() => {
      expect(sections[0]).not.toHaveClass('scroll-reveal')
      expect(sections[1]).toHaveClass('scroll-reveal', 'is-visible')
      expect(article).toHaveClass('scroll-reveal', 'is-visible')
    })
  })

  it('marks the home route for the dedicated entrance sequence', () => {
    const { container } = render(
      <MemoryRouter>
        <Layout>
          <section>Home</section>
        </Layout>
      </MemoryRouter>,
    )

    expect(container.querySelector('#main-content')).toHaveClass(
      'route-enter',
      'route-enter-home',
    )
  })
})
