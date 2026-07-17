import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { catChatApiPlugin } from './server/catChatApiPlugin.js'
import { portraitHistoryApiPlugin } from './server/portraitHistoryApiPlugin.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), catChatApiPlugin(env.OPENAI_API_KEY), portraitHistoryApiPlugin(env.OPENAI_API_KEY)],
  }
})
