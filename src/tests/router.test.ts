import { assertEquals } from 'jsr:@std/assert'
import { describe, it } from 'jsr:@std/testing/bdd'
import { createMockContext } from 'jsr:@oak/oak/testing'
import { badgeRoutes } from '../router/badgeRoutes.ts'
import { handleStack } from '../router/badge/stack.ts'

describe('Badge routes', () => {
  const mockProps = {
    title: 'react',
    color: 'green',
    icon: 'react',
    value: '50',
    size: '50',
  }

  const singleBadges = badgeRoutes.filter(route => route.path === '/plain' || route.path === '/skill')
  singleBadges.forEach(route => {
    it(`should handle ${route.method.toUpperCase()} ${route.path} route`, async () => {
      const ctx = createMockContext({
        method: route.method,
        path: route.path,
      })
      if (route.props.length > 0) {
        const url = new URL(ctx.request.url)
        route.props.forEach(prop => {
          url.searchParams.set(prop, mockProps[prop])
        })
        Object.defineProperty(ctx.request, 'url', { value: url })
      }

      await route.handler(route.props)(ctx)

      assertEquals(ctx.response.type, 'image/svg+xml; charset=utf-8')
    })
  })

  it('should handle stack route', async () => {
    const ctx = createMockContext({
      method: 'get',
      path: '/stack',
    })
    const url = new URL(ctx.request.url)
    url.search = '?title=react&color=green&icon=react&value=50;title=node&color=blue&icon=node&value=80'
    Object.defineProperty(ctx.request, 'url', { value: url })

    await handleStack(ctx)

    assertEquals(ctx.response.type, 'image/svg+xml; charset=utf-8')
  })

  it('should return 400 for stack route with less than 2 items', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/stack',
    })
    const url = new URL(ctx.request.url)
    url.search = '?title=react&color=green&icon=react&value=50'
    Object.defineProperty(ctx.request, 'url', { value: url })

    await handleStack(ctx)

    assertEquals(ctx.response.status, 400)
  })

  it('should handle routes without props', async () => {
    const singleBadges = badgeRoutes.filter(route => route.path === '/plain' || route.path === '/skill')
    singleBadges.forEach(async route => {
      const ctx = createMockContext({
        method: 'GET',
        path: route.path,
      })
      const url = new URL(ctx.request.url)
      Object.defineProperty(ctx.request, 'url', { value: url })

      await route.handler(route.props)(ctx)

      assertEquals(ctx.response.type, 'image/svg+xml; charset=utf-8')
    })
  })

  it('handleStack - invalid input', async () => {
    const ctx = createMockContext({
      method: 'get',
      path: '/stack',
    })

    await handleStack(ctx)

    assertEquals(ctx.response.status, 400)
  })
})
