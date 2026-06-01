import AppFinder from '@/utils/AppFinder'
import { CccdApp } from '@/utils/CccdApp'
import { CduiApp } from '@/utils/CduiApp'

describe('AppFinder', () => {
  test('returns CccdApp for cccd', () => {
    const app = AppFinder('cccd')
    expect(app).toBe(CccdApp)
  })

  test('returns CduiApp for cdui', () => {
    const app = AppFinder('cdui')
    expect(app).toBe(CduiApp)
  })

  test('returns undefined for unknown app', () => {
    const app = AppFinder('unknown-app')
    expect(app).toBeUndefined()
  })

  test('returns undefined for null app', () => {
    const app = AppFinder(null)
    expect(app).toBeUndefined()
  })

  test('returns undefined for empty string', () => {
    const app = AppFinder('')
    expect(app).toBeUndefined()
  })
})
