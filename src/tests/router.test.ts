import { assertEquals } from 'jsr:@std/assert'
import { describe, it } from 'jsr:@std/testing/bdd'
import { createMockContext } from 'jsr:@oak/oak/testing'
import { badgeRoutes } from '../router/badgeRoutes.ts'
import { handleStack } from '../router/badge/stack.ts'
import { handleIconList } from '../router/service/icons.ts'
import { handleLogs } from '../router/service/logs.ts'
import { handleMainPage } from '../router/client/page.ts'
import { handleFavicon } from '../router/client/favicon.ts'
import { handleSource } from '../router/client/src.ts'
import { handleImage } from '../router/client/image.ts'

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
      method: 'GET',
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

  it('should handle /icons route', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/icons',
    })

    await handleIconList(ctx)

    assertEquals(ctx.response.type, 'application/json')
  })

  it('should handle /logs/:level route', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/logs',
      params: { level: 'info' },
    }) as any

    await handleLogs(ctx)

    assertEquals(ctx.response.status, 200)
  })

  it('should return status 400 for an invalid log level', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/logs',
      params: { level: 'test' },
    }) as any

    await handleLogs(ctx)

    assertEquals(ctx.response.status, 400)
  })

  it('should handle / route', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/',
    })

    await handleMainPage(ctx)

    assertEquals(ctx.response.type, 'text/html; charset=utf-8')
  })

  it('should handle /favicon route', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/favicon',
    })

    await handleFavicon(ctx)

    assertEquals(ctx.response.type, 'image/svg+xml; charset=utf-8')
  })

  it('should handle /:file route', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/test.svg',
    })

    await handleSource(ctx)

    assertEquals(ctx.response.type, 'image/svg+xml')

    assertEquals(ctx.response.status, 200)
  })

  it('should return status 400 for an invalid file', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/test.',
    })

    await handleSource(ctx)

    assertEquals(ctx.response.status, 400)
  })

  it('should handle /img/:file route', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/img/copy.svg',
    })

    const ctx2 = createMockContext({
      method: 'GET',
      path: '/img/copy.svg',
    })

    await handleImage(ctx)
    await handleImage(ctx2)

    assertEquals(ctx.response.type, 'image/svg+xml; charset=utf-8')
    assertEquals(ctx.response.status, 200)
    assertEquals(ctx2.response, ctx.response)
  })

  it('should return existing icon on second request', async () => {
    const firstCtx = createMockContext({
      method: 'GET',
      path: '/img/copy.svg',
    })
    const secondCtx = createMockContext({
      method: 'GET',
      path: '/img/copy.svg',
    })

    await handleImage(firstCtx)

    await handleImage(secondCtx)

    assertEquals(firstCtx.response, secondCtx.response)
  })

  it('should return status 400 for empty img', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/img/',
    })

    await handleImage(ctx)

    assertEquals(ctx.response.status, 400)
    assertEquals(ctx.response.body, 'Wrong request')
  })

  it('handleStack - invalid input', async () => {
    const ctx = createMockContext({
      method: 'GET',
      path: '/stack',
    })

    await handleStack(ctx)

    assertEquals(ctx.response.status, 400)
  })
})

// Deno.test('ClientIcons class', async t => {
//   const clientIcons = new ClientIcons()

//   await t.step('should return cached icon on second request', async () => {
//     const firstResult = await clientIcons.get('copy.svg')
//     const secondResult = await clientIcons.get('copy.svg')

//     assertEquals(firstResult, secondResult)
//     assertEquals(
//       firstResult,
//       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
//     )
//   })

//   // await t.step('should return empty string for missing file', async () => {
//   //   const result = await clientIcons.get('test.svg')
//   //   assertEquals(result, '')
//   // })

//   // await t.step('should handle different icon names', async () => {
//   //   const result1 = await clientIcons.get('copy.svg')
//   //   const result2 = await clientIcons.get('cross.svg')

//   //   assertEquals(result1, '<svg><text>Test Icon</text></svg>')
//   //   assertEquals(result2, '<svg><text>Missing Icon</text></svg>')
//   // })
// })
