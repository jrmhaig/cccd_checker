import Pinger from '@/utils/Pinger'
import { CccdApp } from '@/utils/CccdApp'

// Mock the PingResult to simplify tests
jest.mock('@/utils/PingResult', () => {
  return jest.fn((args) => ({
    response_time: args.response_time,
    data: args.data,
  }))
})

global.fetch = jest.fn()
global.performance = {
  now: jest.fn(() => 100),
}

describe('Pinger', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('initializes with app configuration', () => {
    const pinger = new Pinger({ app: CccdApp })
    expect(pinger.app).toBe(CccdApp)
  })

  test('returns null for unknown environment', async () => {
    const pinger = new Pinger({ app: CccdApp })
    const result = await pinger.call('unknown-env')
    expect(result).toBeNull()
  })

  test('fetches data from environment host', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ branch: 'main', commit_id: 'abc123' }),
    })

    const pinger = new Pinger({ app: CccdApp })
    const result = await pinger.call('production')

    expect(global.fetch).toHaveBeenCalledWith(
      'https://claim-crown-court-defence.service.gov.uk/ping',
      { next: { revalidate: 15 } }
    )
    expect(result.data).toEqual({ branch: 'main', commit_id: 'abc123' })
  })

  test('handles fetch errors gracefully', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => {
        throw new Error('JSON parse error')
      },
    })

    const pinger = new Pinger({ app: CccdApp })
    const result = await pinger.call('production')

    expect(result.data).toEqual({})
  })

  test('records response time', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({}),
    })

    const pinger = new Pinger({ app: CccdApp })
    const result = await pinger.call('production')

    expect(result.response_time).toBeDefined()
  })
})
