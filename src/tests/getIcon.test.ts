import { assertEquals } from 'jsr:@std/assert'
import { describe, it } from 'jsr:@std/testing/bdd'
import getIcon from '../utils/getIcon.ts'

describe('Badge Routes', () => {
  it('getIcon function should return empty string for non-existent icon', async () => {
    const missingResult = await getIcon('non-existent')

    assertEquals(missingResult, '')
  })
})
