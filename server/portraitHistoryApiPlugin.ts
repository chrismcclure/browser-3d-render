import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import {
  fetchPortraitHistoryFromOpenAI,
  parseHistoryGeneratorId,
} from './openaiPortraitHistory.js'

const API_PATH = '/api/portrait-history'

function isPortraitHistoryRequest(url: string | undefined, method: string | undefined) {
  if (method !== 'POST' || !url) {
    return false
  }

  const pathname = url.split('?')[0]
  return pathname === API_PATH
}

function sendJson(res: ServerResponse, statusCode: number, body: unknown) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = ''

    req.on('data', (chunk) => {
      data += chunk
    })

    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch {
        reject(new Error('Invalid JSON body.'))
      }
    })

    req.on('error', reject)
  })
}

async function handlePortraitHistoryRequest(
  apiKey: string | undefined,
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const body = await readJsonBody(req)
    parseHistoryGeneratorId(body)
    const story = await fetchPortraitHistoryFromOpenAI(apiKey ?? '')
    sendJson(res, 200, { story })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch portrait history.'
    sendJson(res, 500, { error: message })
  }
}

function attachPortraitHistoryMiddleware(
  apiKey: string | undefined,
  middlewares: { use: ViteDevServer['middlewares']['use'] },
  logger?: { warn: (message: string) => void },
) {
  if (!apiKey && logger) {
    logger.warn(
      '[portrait-history] OPENAI_API_KEY is not configured. Portrait history will fail.',
    )
  }

  middlewares.use((req, res, next) => {
    if (!isPortraitHistoryRequest(req.url, req.method)) {
      next()
      return
    }

    void handlePortraitHistoryRequest(apiKey, req, res)
  })
}

export function portraitHistoryApiPlugin(apiKey: string | undefined): Plugin {
  return {
    name: 'portrait-history-api',
    configureServer(server) {
      attachPortraitHistoryMiddleware(apiKey, server.middlewares, server.config.logger)
    },
    configurePreviewServer(server: PreviewServer) {
      attachPortraitHistoryMiddleware(apiKey, server.middlewares, server.config.logger)
    },
  }
}
