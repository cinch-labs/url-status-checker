import fetch from 'node-fetch'
import {Link, LinksFile} from "./schema";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD'
const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'HEAD']

const makeRequest = async (method: HttpMethod, url: string, body: string) => {
  let params: Record<string, string> = {
    method: method,
  }

  if (method in ['POST', 'PUT']) {
    params['body'] = body
  }

  return fetch(url, params)
}

const trimSlashes = (url?: string) => {
  if(url) {
    return url.replace(/\/$/, "").replace(/^\//, "")
  }

  return url
}

export const checkLink = async (link: Link, baseUrl?: string) => {
  const {method, statusCode, body} = link

  const url = baseUrl !== undefined ? `${trimSlashes(baseUrl)}/${trimSlashes(link.url)}` : link.url

  if (!allowedMethods.includes(method)) {
    throw new Error(`${method} is not allowed to be used`)
  }

  const response = await makeRequest(method, url, body || '')

  return {
    url,
    statusCode,
    method,
    success: response.status === statusCode,
    responseStatusCode: response.status
  }
}

export const checkAllLinks = async (linksFile: LinksFile) => {
  return Promise.all(linksFile.links.map(async (link) => checkLink(link, linksFile.baseUrl)))
}
