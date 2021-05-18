import {Link} from "../src/schema";
import {checkAllLinks} from "../src/link";

describe('checkAllLinks()', () => {
  test('can check one link', async () => {
    const urls: Link[] = [
      {
        url: 'https://httpbin.org/status/200',
        statusCode: 200,
        method: 'GET',
      }
    ]

    await expect(checkAllLinks(urls)).resolves.toStrictEqual([{
      url: 'https://httpbin.org/status/200',
      success: true,
      method: 'GET',
      responseStatusCode: 200,
      statusCode: 200,
    }])
  })

  test('can check multiple links', async () => {
    const urls: Link[] = [
      {
        url: 'https://httpbin.org/status/200',
        statusCode: 200,
        method: 'GET',
      },
      {
        url: 'https://httpbin.org/status/200',
        statusCode: 200,
        method: 'POST',
        body: JSON.stringify({
          test: 123,
          example: 'abc'
        })
      },
    ]

    await expect(checkAllLinks(urls)).resolves.toStrictEqual([
      {
        url: 'https://httpbin.org/status/200',
        success: true,
        method: 'GET',
        responseStatusCode: 200,
        statusCode: 200,
      },
      {
        url: 'https://httpbin.org/status/200',
        success: true,
        method: 'POST',
        responseStatusCode: 200,
        statusCode: 200,
      }
    ])
  })

  test('can send a body with PUT, POST and PATCH', async () => {
    const urls: Link[] = [
      {
        url: 'https://httpbin.org/status/200',
        statusCode: 200,
        method: 'PUT',
        body: JSON.stringify({
          test: 123,
          example: 'abc'
        })
      },
      {
        url: 'https://httpbin.org/status/200',
        statusCode: 200,
        method: 'POST',
        body: JSON.stringify({
          test: 123,
          example: 'abc'
        })
      },
      {
        url: 'https://httpbin.org/status/200',
        statusCode: 200,
        method: 'PATCH',
        body: JSON.stringify({
          test: 123,
          example: 'abc'
        })
      },
    ]

    await expect(checkAllLinks(urls)).resolves.toStrictEqual([
      {
        url: 'https://httpbin.org/status/200',
        success: true,
        method: 'PUT',
        responseStatusCode: 200,
        statusCode: 200,
      },
      {
        url: 'https://httpbin.org/status/200',
        success: true,
        method: 'POST',
        responseStatusCode: 200,
        statusCode: 200,
      },
      {
        url: 'https://httpbin.org/status/200',
        success: true,
        method: 'PATCH',
        responseStatusCode: 200,
        statusCode: 200,
      }
    ])
  })

  test('does not support DELETE', async () => {
    const urls: Link[] = [
      {
        url: 'https://httpbin.org/status/200',
        statusCode: 200,
        // @ts-ignore
        method: 'DELETE',
      }
    ]

    await expect(checkAllLinks(urls)).rejects.toThrow()
  })
})


