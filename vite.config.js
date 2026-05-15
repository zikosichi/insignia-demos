import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-public-slides',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/slides' || req.url === '/slides/') {
            const filePath = path.resolve(__dirname, 'public/slides/index.html')
            try {
              const html = fs.readFileSync(filePath, 'utf-8')
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              res.end(html)
              return
            } catch {
              // fall through to default handling if the file isn't there
            }
          }
          next()
        })
      },
    },
  ],
})
