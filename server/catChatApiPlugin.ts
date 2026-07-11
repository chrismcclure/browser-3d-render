import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import { fetchCatDialogueFromOpenAI, parseConversationMessages } from './openaiCatChat.js'

const API_PATH = '/api/cat-chat'

function isCatChatRequest(url: string | undefined, method: string | undefined) {
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

async function handleCatChatRequest(
  apiKey: string | undefined,
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const body = await readJsonBody(req)
    const messages = parseConversationMessages(body)
    const message = await fetchCatDialogueFromOpenAI(apiKey ?? '', messages)
    sendJson(res, 200, { message })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch cat dialogue.'
    sendJson(res, 500, { error: message })
  }
}

function attachCatChatMiddleware(
  apiKey: string | undefined,
  middlewares: { use: ViteDevServer['middlewares']['use'] },
  logger?: { warn: (message: string) => void },
) {
  if (!apiKey && logger) {
    logger.warn('[cat-chat] OPENAI_API_KEY is not configured. Cat dialogue will fail.')
  }

  middlewares.use((req, res, next) => {
    if (!isCatChatRequest(req.url, req.method)) {
      next()
      return
    }

    void handleCatChatRequest(apiKey, req, res)
  })
}

export function catChatApiPlugin(apiKey: string | undefined): Plugin {
  return {
    name: 'cat-chat-api',
    configureServer(server) {
      attachCatChatMiddleware(apiKey, server.middlewares, server.config.logger)
    },
    configurePreviewServer(server: PreviewServer) {
      attachCatChatMiddleware(apiKey, server.middlewares, server.config.logger)
    },
  }
}
