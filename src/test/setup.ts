import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll } from 'vitest'

beforeAll(() => {
  if (typeof HTMLCanvasElement === 'undefined') return

  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: () => ({
      clearRect: () => undefined,
      fillText: () => undefined,
      getImageData: () => ({ data: new Uint8ClampedArray(2048 * 580 * 4) }),
      measureText: (text: string) => ({ width: text.length * 12 }),
      restore: () => undefined,
      rotate: () => undefined,
      save: () => undefined,
      strokeText: () => undefined,
      translate: () => undefined,
    }),
  })
})

afterEach(() => cleanup())
