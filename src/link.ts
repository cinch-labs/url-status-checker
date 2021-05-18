import fetch from 'node-fetch'
import {Link} from "./schema";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD'

export const makeRequest = async (method: HttpMethod, url: string, body: string) => {
  let params: Record<string, string> = {
    method: method,
  }

  if (method in ['POST', 'PUT']) {
    params['body'] = body
  }

  return fetch(url, params)
}

export const checkLink = async (link: Link) => {
  const {method, url, statusCode, body} = link

    const response = await makeRequest(method, url, body || '')

    return {
      url,
      statusCode,
      method,
      success: response.status === statusCode,
      responseStatusCode: response.status
    }
}

export const checkAllLinks = async (links: Link[]) => {
  return Promise.all(links.map(async (link) => checkLink(link)))
}
